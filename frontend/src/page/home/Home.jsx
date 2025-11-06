import { useEffect, useRef, useState } from "react";
import "./Home.css";

function Home() {
    const [listOpen, setListOpen] = useState(false);    // 드롭다운 상태
    const dropdownRef = useRef(null);                   
    const [line, setLine] = useState("1호선");          // 현재 호선

    // 노선 목록
    const subwayLines = [
        "1호선",
        "2호선",
        "3호선",
        "4호선",
        "5호선",
        "6호선",
        "7호선",
        "8호선",
        "9호선",
        "인천 1호선",
        "인천 2호선",
    ];

    // 노선에 따른 색상 지정

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
    }, [])

    return(
        <>
            <header className="dropdown" ref={dropdownRef}>
                <button className="dropdown-btn" onClick={()=>setListOpen(true)}>{line} 노선 <span className="dropdown-icon">▼</span></button>
                {listOpen && (
                    <ul className="dropdown-list">
                        {subwayLines.map((lineName)=>(
                            <li 
                                key={lineName}
                                className="dropdown-item"
                                onClick={()=>{
                                    setLine(lineName);
                                    setListOpen(false);
                                }}
                            >
                                {lineName}
                            </li>
                        ))}
                    </ul>
                )}
            </header>

            <div className="line-container">
                
            </div>
        </>
    )
}

export default Home;