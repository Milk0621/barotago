import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SubwayLine from "../../components/subwayLine/SubwayLine";

// 노선 정보 (컴포넌트 밖으로 빼서 재생성을 막음)
const subwayLines = [
    { "lineCode": "LINE1", "lineName": "1호선", "colorHex": "#0F218B", "textColor": "light" },
    { "lineCode": "LINE2", "lineName": "2호선", "colorHex": "#10a643", "textColor": "light" },
    { "lineCode": "LINE3", "lineName": "3호선", "colorHex": "#de6d00", "textColor": "light" },
];

function Home() {
    const [listOpen, setListOpen] = useState(false);                    // 드롭다운 상태
    const [selectedLine, setSelectedLine] = useState(subwayLines[0]);   // 현재 호선
    const dropdownRef = useRef(null);                   
    

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

    // 노선별 역 목록 (API 연동 예정)
    const lineStations = [
        { name: "연천", address: "대한민국 서울특별시", phone: "063-213-512" }, { name: "전곡" }, { name: "청산" }, { name: "소요산" }, { name: "동두천" }, { name: "보산" }, { name: "동두천중앙" },
        { name: "지행" }, { name: "덕정" }, { name: "덕계" }, { name: "양주" }, { name: "녹양" }, { name: "가능" }, { name: "의정부" },
        { name: "서울"}
    ];

    return(
        <>
            <div className="dropdown" ref={dropdownRef} style={{backgroundColor: selectedLine.colorHex}}>
                <button 
                    className="dropdown-btn" 
                    onClick={()=>setListOpen((prev)=>!prev)}
                    style={{color: selectedLine.textColor === "light" ? "#fff" : "#111",}}
                >
                    {selectedLine.lineName} 노선 ▾
                </button>
                {listOpen && (
                    <ul className="dropdown-list">
                        {subwayLines.map((item)=>(
                            <li 
                                key={item.lineCode}
                                className="dropdown-item"
                                onClick={()=>{
                                    setSelectedLine(item);
                                    setListOpen(false);
                                }}
                            >
                                {item.lineName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <SubwayLine name={selectedLine.lineName} color={selectedLine.colorHex} stations={lineStations} size={7} />
        </>
    )
}

export default Home;