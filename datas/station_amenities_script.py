import os
import pandas as pd
import pymysql
from dotenv import load_dotenv

# CSV 파일 읽기
# 편의시설 컬럼 이름들 (CSV 컬럼명과 반드시 일치해야 함)
AMENITY_COLUMNS = [
    "wheelchair_charge",
    "lost_found",
    "parking",
    "bicycle",
    "document",
    "atm",
    "nursing_room",
    "camera",
    "phone_charge",
    "locker",
]

# 값이 "있음"인지 판별하는 함수
def is_available(value):
    # CSV 셀 값이 편의시설 '있음'을 의미하는지 확인하는 함수.
    # - NaN 이면 False
    # - 'Y', '1', 'True' 등은 True 로 처리

    # pandas 의 NaN 인지 먼저 확인
    if pd.isna(value):
        return False

    text = str(value).strip()

    # 필요하면 여기 리스트를 늘려도 됨
    truthy_values = ["Y", "y", "1", "True", "true", "T", "t"]

    if text in truthy_values:
        return True
    else:
        return False


# DB 연결 함수
def get_connection():

    # .env 에서 DB 접속 정보를 읽어와서 pymysql Connection 객체를 반환

    load_dotenv()

    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_CHARSET = os.getenv("DB_CHARSET")

    print("DB_PASSWORD 로드 결과:", DB_PASSWORD)

    conn = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset=DB_CHARSET
    )

    return conn

# amenities 테이블에서 매핑 정보 가져오기
def load_amenity_map(cursor):
    # amenities 테이블에서 amenity_id, amenity_name 을 읽어서 {amenity_name: amenity_id} 형태의 딕셔너리를 만들어 반환

    sql = "SELECT amenity_id, amenity_name FROM amenities"
    cursor.execute(sql)

    rows = cursor.fetchall()

    amenity_map = {}

    for row in rows:
        amenity_id = row[0]   # 첫 번째 컬럼
        amenity_name = row[1] # 두 번째 컬럼
        amenity_map[amenity_name] = amenity_id

    return amenity_map

def load_station_map(cursor):
    # station 테이블에서 station_cd, station_id를 읽어와 station_cd → station_id 매핑 딕셔너리를 만들어 반환

    sql = "SELECT station_id, station_cd FROM station"
    cursor.execute(sql)

    rows = cursor.fetchall()

    station_map = {}

    for row in rows:
        station_id = row[0]
        station_cd = row[1]
        station_map[station_cd] = station_id

    return station_map

# 메인 로직
def main():
    # CSV 읽기
    print("CSV 파일(stations_amenities.csv)을 읽는 중...")
    df = pd.read_csv("./datas/stations_amenities.csv", encoding="utf-8")

    # CSV 안에 정말 이 컬럼들이 다 있는지 체크 (디버깅용)
    print("CSV 컬럼 목록:", list(df.columns))

    # DB 연결
    print("DB에 연결하는 중...")
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # amenity_name -> amenity_id 매핑 로드
        print("amenities 테이블에서 매핑 정보를 가져오는 중...")
        amenity_map = load_amenity_map(cursor)
        print("로드된 amenity 매핑:", amenity_map)

        # station_cd → station_id 매핑 로드
        print("station 테이블 매핑(station_cd → station_id) 로드 중...")
        station_map = load_station_map(cursor)
        print("로드된 station 매핑 개수:", len(station_map))

        # INSERT SQL 템플릿
        # 같은 (station_id, amenity_id) 에 대해 여러 번 실행할 수 있으면 'INSERT IGNORE' 로 바꾸는 것도 방법입니다.
        insert_sql = """
            INSERT INTO station_amenity (station_id, amenity_id, available)
            VALUES (%s, %s, 1)
        """

        total_insert_count = 0

        # 각 행(역)마다 편의시설 확인
        for index, row in df.iterrows():
            # CSV에는 station_id가 아니라 station_cd가 있음
            station_cd = str(row["station_cd"]).strip()

            # station_cd가 DB에 존재하는지 확인
            if station_cd not in station_map:
                print(f"[경고] station_cd 매핑 실패: {station_cd}")
                continue

            station_id = station_map[station_cd]  # 실제 station_id

            # 각 편의시설 컬럼을 하나씩 확인
            for amenity_col in AMENITY_COLUMNS:
                # 혹시 CSV 에 컬럼이 없다면 건너뛰고 경고 출력
                if amenity_col not in df.columns:
                    print(f"[경고] CSV에 '{amenity_col}' 컬럼이 없습니다. 건너뜀.")
                    continue

                value = row[amenity_col]

                # 편의시설이 있는 경우에만 INSERT
                if is_available(value):
                    # amenities 테이블에서 해당 컬럼명에 대응하는 amenity_id 찾기
                    if amenity_col not in amenity_map:
                        print(
                            f"[경고] amenities 테이블에 '{amenity_col}' 이(가) 없어 INSERT 불가. 건너뜀."
                        )
                        continue

                    amenity_id = amenity_map[amenity_col]

                    # 실제 INSERT 실행
                    cursor.execute(insert_sql, (station_id, amenity_id))
                    total_insert_count += 1

        # 커밋
        conn.commit()
        print(f"총 {total_insert_count}개의 station_amenity 레코드가 삽입")

    except Exception as e:
        # 에러 발생 시 롤백
        conn.rollback()
        print("에러 발생, 롤백")
        print("에러 내용:", e)

    finally:
        # 커서/연결 닫기
        cursor.close()
        conn.close()
        print("DB 연결 종료")

# 스크립트 시작점
if __name__ == "__main__":
    main()