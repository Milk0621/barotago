import { Link } from "react-router-dom";
import facility_icon_map from "../../constants/facilityIcons";
import "./StationInfo.css";

function StationInfo({stationInfo, facilities, onPrev, onNext, color, textColor}) {
    if (!stationInfo) return null;

    return (
        <div className="station-modal" onClick={(e) => e.stopPropagation()} style={{ borderColor: color }}>
            <div 
                className="info-header"
                style={{
                    backgroundColor: color,
                    color: textColor === "light" ? "#fff" : "#111"
                }}
            >
                <span onClick={onPrev}>◀</span>
                <div className="station-name">
                    <h3>{stationInfo.stationName}</h3>
                </div>
                <span onClick={onNext}>▶</span>
            </div>
            <div className="info-box">
                <div className="info-basic">
                    <p>주소</p>
                    <span>{stationInfo.address}</span>
                    <p>전화번호</p>
                    <span>{stationInfo.telno}</span>
                </div>
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
                <div className="link">
                    <Link to="/stations/:stationCd">자세히 보기</Link>
                </div>
            </div>
        </div>
    )
}

export default StationInfo;

    // 카카오 지도 생성
    // useEffect(() => {
    //     if (!selectedStationInfo) return;
    //     if (!window.kakao || !window.kakao.maps) return;

    //     const kakao = window.kakao;
    //     const container = mapRef.current; // 지도를 담을 영역의 DOM 참조

    //     // 지도를 생성할 때 필요한 기본 옵션
    //     const options = {
    //         center: new kakao.maps.LatLng(selectedStationInfo.lng, selectedStationInfo.lat), // 지도의 중심좌표.
    //         level: 3,
    //     };

    //     new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    // }, [selectedStationInfo]);