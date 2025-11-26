import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SubwayLine from "../../components/subwayLine/SubwayLine";
import HeaderBar from "../../components/headerBar/HeaderBar";

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
        { 
            name: "연천", 
            address: "경기도 연천군 연천읍 연천로 275", 
            phone: "1544-7788", 
            lineCodes: ["LINE1"], 
            lineName: ["1호선"],
            label: ["1"],
            facilities: [
                {
                    name: "엘리베이터",
                    iconColor: "#DE3517",
                },
                {
                    name: "휠체어리프트",
                    iconColor: "#C7B10D",
                },
                {
                    name: "무인민원발급",
                    iconColor: "#42AD11",
                },
                {
                    name: "문화공간",
                    iconColor: "#1161AD",
                },
                {
                    name: "유아수유방",
                    iconColor: "#6411AD",
                },
            ] 
        }, 
        { name: "전곡" }, { name: "청산" }, { name: "소요산" }, { name: "동두천" }, { name: "보산" }, { name: "동두천중앙" },{ name: "지행" }, { name: "덕정" }, { name: "덕계" }, { name: "양주" }, { name: "녹양" }, { name: "가능" }, { name: "의정부" }, { name: "서울"}
    ];

    return(
        <>
            <HeaderBar
                type="line"
                subwayLines={subwayLines}
                selectedLine={selectedLine}
                setSelectedLine={setSelectedLine}
            />
            <div className="line-info">
                <div className="route-group">
                    <button>1호선</button>
                    <button>경인선 (구로-인천)</button>
                    <button>경부 장항선(구로-신창)</button>
                    <button>경부고속선</button>
                    <button>병점기지선</button>
                </div>
                <span>{selectedLine.lineName} 0대 운행 중</span>
            </div>
            <SubwayLine color={selectedLine.colorHex} textColor={selectedLine.textColor} stations={lineStations} size={7} />
        </>
    )
}

export default Home;