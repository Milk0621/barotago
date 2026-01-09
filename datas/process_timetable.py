import requests
import csv
import pymysql
import xml.etree.ElementTree as ET
from dotenv import load_dotenv
import os
from time import sleep

load_dotenv()

API_KEY = os.getenv("SEOUL_API_KEY")

# DB 연결 (역 목록용)
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET")
)
cursor = conn.cursor()

# 역 목록 조회
cursor.execute("""
    SELECT station_cd, station_name
    FROM station
    ORDER BY station_cd
""")

stations = cursor.fetchall()
print(f"역 개수: {len(stations)}")

# API 설정
BASE_URL = (
    "http://openapi.seoul.go.kr:8088/"
    "{key}/{type}/{service}/{start}/{end}/{station}/{week}/{inout}"
)

SERVICE = "SearchSTNTimeTableByIDService"
TYPE = "xml"
START_INDEX = 1
END_INDEX = 1000

WEEK_TAGS = [1, 2, 3]   # 평일 / 토 / 공휴일
INOUT_TAGS = [1, 2]    # 상행 / 하행

OUTPUT_FILE = "./datas/station_timetable_all.csv"

# 수집 함수
def fetch_timetable(writer, station_cd, station_nm, week_tag, inout_tag):
    url = BASE_URL.format(
        key=API_KEY,
        type=TYPE,
        service=SERVICE,
        start=START_INDEX,
        end=END_INDEX,
        station=station_cd,
        week=week_tag,
        inout=inout_tag
    )

    res = requests.get(url)
    res.raise_for_status()

    root = ET.fromstring(res.text)
    rows = root.findall("row")

    for row in rows:
        arrive_time = row.findtext("ARRIVETIME")
        if not arrive_time:
            continue

        hour, minute, _ = arrive_time.split(":")

        writer.writerow([
            row.findtext("LINE_NUM"),
            station_cd,
            station_nm,
            row.findtext("WEEK_TAG"),
            row.findtext("INOUT_TAG"),
            arrive_time,
            hour,
            minute,
            row.findtext("TRAIN_NO"),
            "Y" if row.findtext("EXPRESS_YN") == "G" else "N",
            row.findtext("ORIGINSTATION"),
            row.findtext("DESTSTATION")
        ])

# 메인 실행
with open(OUTPUT_FILE, mode="w", newline="", encoding="utf-8-sig") as file:
    writer = csv.writer(file)

    # CSV 헤더
    writer.writerow([
        "line_num",
        "station_cd",
        "station_nm",
        "week_tag",
        "inout_tag",
        "arrive_time",
        "hour",
        "minute",
        "train_no",
        "is_express",
        "origin_station",
        "dest_station"
    ])

    for station_cd, station_nm in stations:
        for week in WEEK_TAGS:
            for direction in INOUT_TAGS:
                print(
                    f"수집 중 → 역:{station_nm}({station_cd}), "
                    f"요일:{week}, 방향:{direction}"
                )
                fetch_timetable(
                    writer,
                    station_cd,
                    station_nm,
                    week,
                    direction
                )
                sleep(0.3)  # 호출 제한 대비

cursor.close()
conn.close()

print("전체 역 시간표 CSV 생성 완료")
print(f"파일명: {OUTPUT_FILE}")
