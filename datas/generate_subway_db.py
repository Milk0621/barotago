import pandas as pd
import pymysql
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_CHARSET = os.getenv("DB_CHARSET")

# DB 연결
conn = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME,
    charset=DB_CHARSET
)
cursor = conn.cursor()

# 파일 경로 설정 및 읽기
BASE = Path(__file__).resolve().parent
station_file = BASE / "stations_cleaned.csv"
route_file = BASE / "국토교통부_도시철도 전체노선_20241010.csv"

stations = pd.read_csv(station_file, encoding="utf-8")
routes = pd.read_csv(route_file, encoding="cp949")

# 괄호 제거
clean = lambda x: str(x).split("(")[0].strip()

stations["clean_name"] = stations["station_nm"].apply(clean)
routes["clean_name"] = routes["역명"].apply(clean)
routes["clean_line"] = routes["노선명"].apply(clean)

# 노선 네이밍 정의
BRANCH_MAP = {
    "경인선": ("LINE1", "GYEONGIN"),
    "경부장항선": ("LINE1", "GYEONGBUJANGHANG"),
    "병점기지선": ("LINE1", "BYEONGJEOM"),
    "경부고속선": ("LINE1", "GYEONGBUHIGH"),
    "성수지선": ("LINE2", "SEONGSU"),
    "신정지선": ("LINE2", "SINJEONG"),
    "마천지선": ("LINE5", "MACHEON"),
    "하남선": ("LINE5", "HANAM"),
}

def generate_line_code(name):
    name = clean(name)

    # 본선
    if "호선" in name:
        num = name.replace("호선", "")
        return f"LINE{num}"

    # 브랜치
    if name in BRANCH_MAP:
        parent, eng = BRANCH_MAP[name]
        return f"{parent}_{eng}"

# station 테이블 insert
print("station 테이블 INSERT 중...")

for index, row in stations.iterrows():

    station_cd = row["station_cd"]
    raw_name = row["station_nm"]          # 원본 데이터
    clean_name = row["clean_name"]        # 괄호 제거된 데이터
    raw_address = row["address"]

    if pd.isna(raw_address):
        address = None                    # NaN이면 None으로 변환
    else:
        address = str(raw_address)

    raw_lat = row["cy"]
    raw_lng = row["cx"]

    # lat 변환
    if pd.isna(raw_lat):
        lat = None
    else:
        lat = float(raw_lat)

    # lng 변환
    if pd.isna(raw_lng):
        lng = None
    else:
        lng = float(raw_lng)

    raw_tel = row["telno"]

    if pd.isna(raw_tel):
        tel = None
    else:
        tel = str(raw_tel)

    sql = """
        INSERT INTO station (station_cd, station_name, address, lat, lng, telno)
        VALUES (%s, %s, %s, %s, %s, %s)
    """

    params = (
        station_cd,     # VARCHAR
        clean_name,     # VARCHAR
        address,        # VARCHAR / NULL
        lat,            # DECIMAL / NULL
        lng,            # DECIMAL / NULL
        tel             # VARCHAR / NULL
    )

    cursor.execute(sql, params)
    
conn.commit()

print("✔ station 데이터 입력 완료!")


# service 테이블 insert
print("service_lines INSERT 중...")

unique_lines = routes["clean_line"].unique()
line_inserted = set()

for line in unique_lines:
    base = clean(line)
    code = generate_line_code(base)

    if code in line_inserted:
        continue

    # 본선
    if "호선" in base:
        parent = None
        order_no = int(base.replace("호선", ""))

    # 브랜치
    elif base in BRANCH_MAP:
        parent = BRANCH_MAP[base][0]
        order_no = 100

    else:
        parent = None
        order_no = 999

    sql = """
        INSERT INTO service_lines (line_code, line_name, parent_code, order_no)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(sql, (code, base, parent, order_no))

    line_inserted.add(code)

conn.commit()
print("service_lines 입력 완료!")


# service_line_station 테이블 insert
print("service_line_station INSERT 중...")

cursor.execute("SELECT station_id, station_name FROM station")
station_map = {row[1]: row[0] for row in cursor.fetchall()}

for index, row in routes.iterrows():

    # 1. 역 이름 clean() 적용
    raw_station_name = row["역명"]
    name = clean(raw_station_name)

    # 2. 노선명 처리
    raw_line_name = row["노선명"]
    line_name = clean(raw_line_name)
    code = generate_line_code(line_name)

    seq = int(row["순번"])

    if name not in station_map:
        print("매칭 실패:", name)
        continue

    station_id = station_map[name]

    sql = """
        INSERT INTO service_line_station (line_code, station_id, sequence_no)
        VALUES (%s, %s, %s)
    """
    cursor.execute(sql, (code, station_id, seq))

conn.commit()
print("service_line_station 입력 완료!")

cursor.close()
conn.close()

print("\n 모든 데이터 입력 완료!")