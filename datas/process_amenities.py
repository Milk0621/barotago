import pandas as pd

# 원본 CSV 읽기
df = pd.read_csv("./datas/stations.csv")

# 필요한 컬럼만 추출
amenity_columns = [
    "station_cd",
    "wheelchair_charge",
    "lost_found",
    "parking",
    "bicycle",
    "document",
    "atm",
    "nursing_room",
    "camera",
    "phone_charge",
    "locker"
]

df_out = df[amenity_columns]

# 새 CSV 파일 저장
df_out.to_csv("./datas/stations_amenities.csv", index=False, encoding="utf-8-sig")

print("stations_amenities.csv 생성 완료!")