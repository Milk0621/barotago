import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SubwayLine from "../../components/subwayLine/SubwayLine";
import HeaderBar from "../../components/headerBar/HeaderBar";
import api from "../../api/api";


function Home() {
    const [listOpen, setListOpen] = useState(false);                    // 드롭다운 상태
    const [subwayLines, setSubwayLines] = useState([]);               // 노선 목록
    const [selectedLine, setSelectedLine] = useState(null);             // 현재 선택된 호선
    const [subwayChildLines, setSubwayChildLines] = useState([]);     // 하위 노선 목록
    const [selectedChildLine, setSelectedChildLine] = useState(null);   // 현재 선택된 하위 호선
    const [lineStations, setLineStations] = useState([]);
    const dropdownRef = useRef(null);                   
    
    // 노선 목록 조회 API
    useEffect(()=>{
        async function fetchLines() {
            const res = await api.get("/subway/lines");
            
            setSubwayLines(res.data);
            setSelectedLine(res.data[0]);
        }
        fetchLines();
    }, []);
    
    // 하위 노선 목록 조회 API, 노선별 역 목록 API
    useEffect(()=>{
        if (!selectedLine) return;
        
        async function fetchChildLines() {
            const res = await api.get(`/subway/lines/${selectedLine.lineCode}/children`);
            
            setSubwayChildLines(res.data);
            setSelectedChildLine(res.data[0]);
        }
        fetchChildLines();
    }, [selectedLine]);

    useEffect(() => {
        if (!selectedChildLine) return;

        async function fetchLineStations() {
            const res = await api.get(`/subway/lines/${selectedChildLine.lineCode}/stations`);

            setLineStations(res.data);
        }

        fetchLineStations();
    }, [selectedChildLine]);

    // 드롭다운 밖 클릭 감지 이벤트
    useEffect(()=>{
        if (!listOpen) return;

        function handleClickOutside(e) {
            // dropdown.current가 있고, 클릭한 대상이 그 영역 밖이라면 닫기
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setListOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside); // 클릭 감지
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); //cleanup
        }
    }, [listOpen]);

    return(
        <>
            {selectedLine && subwayLines && (
                <HeaderBar
                    type="line"
                    subwayLines={subwayLines}
                    selectedLine={selectedLine}
                    setSelectedLine={setSelectedLine}
                />
            )}

            {selectedLine && subwayChildLines && (
                <>
                    <div className="line-info">
                        <div className="route-group">
                            {subwayChildLines.map((childLine, idx)=>{
                                const isSelected = selectedChildLine?.lineCode === childLine.lineCode;
                                return (
                                    <button 
                                        key={idx} 
                                        className={`${isSelected ? "active" : ""}`}
                                        style={{"--line-color": selectedLine.colorHex}}
                                        onClick={()=> setSelectedChildLine(childLine)}
                                    >
                                        {childLine.lineName}
                                    </button>
                                )
                            })}
                        </div>
                        <span>{selectedLine.lineName} 0대 운행 중</span>
                    </div>

                    <SubwayLine
                        color={selectedLine.colorHex}
                        textColor={selectedLine.textColor}
                        stations={lineStations}
                        size={7}
                    />
                </>
            )}
        </>
    )
}

export default Home;