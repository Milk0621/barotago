import { useRef, useState } from "react";
import "./Header.css";

function Header() {
    const [open, setOpen] = useState(false);
    const closeBtnRef = useRef(null);

    return (
        <>
            <header>
                <img src="/img/logo.png" alt="barotago" />
                <button className="hamburger" onClick={()=>setOpen(true)}>
                    <span />
                    <span />
                    <span />
                </button>
            </header>
            
        </>
    )
}

export default Header;