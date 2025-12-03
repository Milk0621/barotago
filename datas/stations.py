import pandas as pd

df = pd.read_csv("./datas/stations.csv")

need_cols = ["line_num", "station_cd", "station_nm", "address", "cx", "cy", "telno"]
df_filtered = df[need_cols]

df_filtered.to_csv("./datas/stations_cleaned.csv", index=False)