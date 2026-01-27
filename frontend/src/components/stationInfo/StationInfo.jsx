import { useEffect, useRef, useState } from "react";
import facility_icon_map from "../../constants/facilityIcons";
import "./StationInfo.css";
import api from "../../api/api";

const TAB = {
    INFO: "INFO",
    TIMETABLE: "TIMETABLE",
};

function StationInfo({stationInfo, facilities, onPrev, onNext, color, textColor}) {
    
    const mapRef = useRef();
    const [activeTab, setActiveTab] = useState(TAB.INFO);

    // 카카오 지도 생성
    useEffect(() => {
        if (activeTab !== TAB.INFO) return;
        if (!stationInfo) return;
        if (!window.kakao || !window.kakao.maps) return;

        const kakao = window.kakao;
        const container = mapRef.current; // 지도를 담을 영역의 DOM 참조

        // 지도를 생성할 때 필요한 기본 옵션
        const options = {
            center: new kakao.maps.LatLng(stationInfo.lng, stationInfo.lat), // 지도의 중심좌표.
            level: 3,
        };
 
        new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    }, [stationInfo, activeTab]);

    if (!stationInfo) return null;

    return (
        <div className="station-modal" onClick={(e) => e.stopPropagation()} style={{ borderColor: color }}>
            <div className="info-header">
                <span 
                    className="on-prev"                 
                    style={{
                        backgroundColor: color,
                        color: textColor === "light" ? "#fff" : "#111",
                        padding: "0 80px 0 10px",
                        marginRight: "-20px"
                    }} 
                    onClick={onPrev}
                >
                    ◀
                </span>
                <div className="station-name" style={{border: `3px solid ${color}`}}>
                    <h3>{stationInfo.stationName}</h3>
                </div>
                <span 
                    className="on-next"                 
                    style={{
                        backgroundColor: color,
                        color: textColor === "light" ? "#fff" : "#111",
                        padding: "0 10px 0 80px",
                        marginLeft: "-20px"
                    }} 
                    onClick={onNext}
                >
                    ▶
                </span>
            </div>
            <div className="tab">
                <button type="button" onClick={() => setActiveTab(TAB.INFO)}>역정보</button>
                <button type="button" onClick={() => setActiveTab(TAB.TIMETABLE)}>열차시각표</button>
            </div>
            <div className="tab-container">
                {activeTab === TAB.INFO && (
                    <InfoTab
                        stationInfo={stationInfo}
                        facilities={facilities}
                        mapRef={mapRef}
                    />
                )}

                {activeTab === TAB.TIMETABLE && (
                    <TimetableTab
                        stationCd={stationInfo.stationCd}
                    />
                )}
            </div>
        </div>
    )
}

export default StationInfo;

function InfoTab ({stationInfo, facilities, mapRef}) {
    return (
        <div className="tabBox1">
            <h3>역 정보</h3>
            <ul>
                <li>
                    <strong>역주소</strong>
                    <span>{stationInfo.address}</span>
                </li>
                <li>
                    <strong>전화번호</strong>
                    <span>{stationInfo.telno}</span>
                </li>
            </ul>
            <div id="map" ref={mapRef}></div>
            <hr />
            <h3>편의시설</h3>
            <div className="facilities">
                {
                    facilities.map((fc, idx)=>(
                        <div className="facility" key={idx}>
                            <img src={facility_icon_map[fc.icon]} alt={fc.facilityNameKo} />
                            <p>{fc.facilityNameKo}</p>
                        </div>
                    ))
                }
            </div>
            <hr />
            <h3>첫차/막차 시간표</h3>
        </div>
    )
}

function TimetableTab ({stationCd}) {
    const [timetable, setTimetable] = useState([]);
    const [weekTag, setWeekTag] = useState(1); // 기본: 평일

    useEffect(()=>{
        if(!stationCd) return;
        async function fetchTimetable() {
            const res = await api.get(`stations/${stationCd}/timetable`, {
                params: {weekTag}
            });
            setTimetable(res.data);

            console.log(res.data);
        }

        fetchTimetable();
    }, [weekTag, stationCd])

    return (
        <div className="tabBox1">
            <div className="timetable-header">
                <h3>열차 시각표</h3>
            </div>
            <table className="timetable">
                <thead>
                    <tr>
                        <th>상행</th>
                        <th>시간</th>
                        <th>하행</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((row, idx) => (
                        <tr key={row.hour}>
                            <td>
                                {row.up.map((m, idx) => (
                                    <span className={`minute ${m.express ? "express" : ""}`} key={idx}>{m.minute}</span>
                                ))}
                            </td>
                            <td>{row.hour}</td>
                            <td>
                                {row.down.map((m, idx) => (
                                    <span className={`minute ${m.express ? "express" : ""}`} key={idx}>{m.minute}</span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}