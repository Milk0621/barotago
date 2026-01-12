import csv
import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

CSV_FILE = "./datas/station_timetable_all.csv"

# DB 연결
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    charset=os.getenv("DB_CHARSET"),
    autocommit=True
)
cursor = conn.cursor()

INSERT_SQL = """
INSERT INTO station_timetable (
    line_num,
    station_cd,
    station_nm,
    week_tag,
    inout_tag,
    arrive_time,
    hour,
    minute,
    train_no,
    is_express,
    origin_station,
    dest_station
) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

# CSV 읽어서 INSERT
with open(CSV_FILE, newline="", encoding="utf-8-sig") as file:
    reader = csv.DictReader(file)

    count = 0
    for row in reader:
        cursor.execute(INSERT_SQL, (
            row["line_num"],
            int(row["station_cd"]),
            row["station_nm"],
            int(row["week_tag"]),
            int(row["inout_tag"]),
            row["arrive_time"],            # TIME 그대로
            int(row["hour"]),
            int(row["minute"]),
            row["train_no"],
            row["is_express"] == "Y",       # Y/N → Boolean
            int(row["origin_station"]),
            int(row["dest_station"])
        ))
        count += 1

print(f"DB 적재 완료: {count} rows")

cursor.close()
conn.close()