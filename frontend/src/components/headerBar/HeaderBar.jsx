import { useEffect, useRef, useState } from "react";
import "./HeaderBar.css";

function HeaderBar({ type, title, subwayLines, selectedLine, setSelectedLine }) {
    // 노선 드롭다운 모드
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open || type !== "line" ) return;

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, type]);

    return (
        <>
            {/* title 모드 */}
            { type === "title" && (
                <div className="page-bar">
                    <h1 className="page-bar-title">{title}</h1>
                </div>
            )}

            {/* 라인 선택 드롭다운 모드 */}
            { type === "line" && (
                <div
                    className="dropdown"
                    ref={dropdownRef}
                    style={{ backgroundColor: selectedLine.colorHex }}
                >
                    <button
                        className="dropdown-btn"
                        onClick={() => setOpen(prev => !prev)}
                        style={{ color: selectedLine.textColor === "light" ? "#fff" : "#111" }}
                    >
                        {selectedLine.lineName} 노선 ▾
                    </button>

                    {open && (
                        <ul className="dropdown-list">
                            {subwayLines.map(item => (
                                <li
                                    key={item.lineCode}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedLine(item);
                                        setOpen(false);
                                    }}
                                >
                                    {item.lineName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}

export default HeaderBar;