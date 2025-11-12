import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [open, setOpen] = useState(false);
    const closeBtnRef = useRef(null);

    return (
        <>
            <header>
                <img src="/img/logo.png" alt="barotago" />
                <button className="hamburger" onClick={() => setOpen(true)}>
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
            
            <div className={`drawer ${open ? "open" : ""}`}>
                <div className="drawer-header">
                    <img src="/img/logo.png" alt="barotago" />
                    <button className="close" onClick={() => setOpen(false)}>x</button>
                </div>
                <nav className="menu-list">
                    <div className="menu-title">메뉴</div>
                        <a href="#timetable" onClick={() => setOpen(false)}>지하철 시간표</a>
                        <a href="#route" onClick={() => setOpen(false)}>경로 검색</a>
                        <a href="#lines" onClick={() => setOpen(false)}>노선</a>
                        <a href="#notice" onClick={() => setOpen(false)}>대피소 안내</a>
                </nav>
            </div>
        </>
    )
}

export default Header;