import { useEffect, useRef, useState } from 'react';
import './SubwayLine.css';
import facility_icon_map from '../../constants/facilityIcons';
import { Link } from 'react-router-dom';
import api from '../../api/api';

// 지하철 노선 자르기
// 총 20개의 역을 7개씩 자른다고 했을 때 arr.length = 20, size = 7
// for문으로 size만큼 i 값을 증가시키고 배열을 i부터 i+size까지 잘라(0~6, 7~13, ...) 빈 배열에 넣음  
function chunk(arr, size) {
    const out = [];
    for(let i = 0; i < arr.length; i += size) {
        out.push(arr.slice(i, i + size));
    }
    return out;
}

// 노선 컴포넌트
function SubwayLine({color, textColor, stations, size}) {

    const rows = chunk(stations, size);

    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <>
            <div className="line-wrap" style={{"--cols": size}}>
                {rows.map((row, rIdx) => {
                    const isEvenRow = rIdx % 2 === 0;                       
                    // 짝수번째 배열(행)이면 true, 왼 -> 오
                    const hasNext = rIdx < rows.length - 1;                 
                    // 마지막 행이 아니면 true, CSS 세로 연결선 그릴 용도
                    const ordered = isEvenRow ? row : [...row].reverse();   
                    // 지그재그를 만들기 위해 행의 표시 순서 변경 (짝수 행: 왼->오, 홀수 행: 오->왼)
                    // [...] 스프레드로 복사한 뒤 .reverse()으로 뒤집어, 원본 훼손 X

                    console.log(ordered);
                    
                    return (
                        <div key={rIdx} className={`stations ${isEvenRow ? "stations-ltr" : "stations-rtl"} ${hasNext ? isEvenRow ? "row-connector-r" : "row-connector-l" : ""}`} style={{ '--line-color': color }}>
                            {ordered.map((st, idx) => (
                                <div className="station" 
                                    key={idx} 
                                    onClick={() => setSelectedIndex(
                                        stations.findIndex(s => s.stationId === st.stationId)
                                    )}
                                >
                                    <i className="dot" style={{borderColor: color}} />
                                    <span className="label">{st.stationName}</span>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>

            {selectedIndex !== null && (
                <StationInfo
                    stations={stations}
                    currentIndex={selectedIndex}
                    onChangeIndex={setSelectedIndex}
                    color={color}
                    textColor={textColor}
                    onClose={() => setSelectedIndex(null)} 
                />
            )}
        </>
    )
}

function StationInfo({stations, currentIndex, onChangeIndex, color, textColor, onClose}) {
    const modalRef = useRef(null);
    const mapRef = useRef(null);

    const station = stations[currentIndex]; // 현재 선택된 역
    const [selectedStationInfo, setSelectedStationInfo] = useState(null);   // 현재 선택된 역 상세정보
    const [stationFacilities, setStationFacilities] = useState([]); // 현재 선택된 역의 편의시설 목록

    // 이전 역 이동
    const goPrev = () => {
        if (currentIndex > 0) {
            onChangeIndex(currentIndex - 1);
        }
    };

    // 다음 역 이동
    const goNext = () => {
        if (currentIndex < stations.length - 1) {
            onChangeIndex(currentIndex + 1);
        }
    };
    
    // 역 상세 정보 + 편의시설 조회
    useEffect(()=>{
        if(!station) return;
        async function fetchStationInfo(){
            const res = await api.get(`/stations/${station.stationId}`);
            
            setSelectedStationInfo(res.data);
            console.log(res.data);
        }

        async function fetchStationFacilities(){
            const res = await api.get(`/stations/${station.stationId}/facilities`);

            setStationFacilities(res.data);
            console.log(res.data);
        }

        fetchStationInfo();
        fetchStationFacilities();
    }, [station])

    // 카카오 지도 생성
    useEffect(() => {
        if (!selectedStationInfo) return;
        if (!window.kakao || !window.kakao.maps) return;

        const kakao = window.kakao;
        const container = mapRef.current; // 지도를 담을 영역의 DOM 참조

        // 지도를 생성할 때 필요한 기본 옵션
        const options = {
            center: new kakao.maps.LatLng(selectedStationInfo.lng, selectedStationInfo.lat), // 지도의 중심좌표.
            level: 3,
        };

        new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    }, [selectedStationInfo]);

    // 모달 외부 클릭 감지
    useEffect(() => {
        function handleClickOutside(e) {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [onClose]);

    if (!selectedStationInfo || !stationFacilities) return null;

    return (
        <div className="station-overlay" onClick={onClose}>
            <div className="station-modal"  ref={modalRef} onClick={(e) => e.stopPropagation()} style={{ borderColor: color }}>
                <div 
                    className="info-header"
                    style={{
                        backgroundColor: color,
                        color: textColor === "light" ? "#fff" : "#111"
                    }}
                >
                    <span onClick={goPrev}>◀</span>
                    <div className="station-name">
                        <h3>{selectedStationInfo.stationName}</h3>
                    </div>
                    <span onClick={goNext}>▶</span>
                </div>
                <div className="info-box">
                    <div className="info-basic">
                        <p>주소</p>
                        <span>{selectedStationInfo.address}</span>
                        <p>전화번호</p>
                        <span>{selectedStationInfo.telno}</span>
                    </div>
                    <div className="facilities">
                        {
                            stationFacilities.map((fc, idx)=>(
                                <div className="facility" key={idx}>
                                    <img src={facility_icon_map[fc.icon]} alt={fc.facilityNameKo} />
                                    <p>{fc.facilityNameKo}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="map" ref={mapRef}></div>
                    <div className="link">
                        <Link to="/notice">지하철 시간표</Link>
                        <Link to="/notice">대피소 안내</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubwayLine;