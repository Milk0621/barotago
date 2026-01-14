import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header>
                <Link to="/"><img src="/img/logo.png" alt="barotago" /></Link>
                <button className="hamburger" onClick={() => setOpen(true)}>
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
            
            <div className={`drawer ${open ? "open" : ""}`}>
                <div className="drawer-header">
                    <Link to="/"><img src="/img/logo.png" alt="barotago" /></Link>
                    <button className="close" onClick={() => setOpen(false)}>x</button>
                </div>
                <nav className="menu-list">
                    <div className="menu-title">메뉴</div>
                    <Link to="/search" onClick={() => setOpen(false)}>검색</Link>
                    <Link to="/" onClick={() => setOpen(false)}>노선</Link>
                </nav>
            </div>
        </>
    )
}

export default Header;