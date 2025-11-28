import HeaderBar from "../../components/headerBar/HeaderBar";
import "./RouteSearch.css";

function RouteSearch() {
    return(
        <>
            <HeaderBar type="title" title="경로 검색" />
            <div className="route-search">
                <input 
                    type="text"
                    placeholder="출발역" 
                />

                <div className="refresh-icon"><img src="/img/refresh-icon.png" alt="" /></div>

                <input 
                    type="text" 
                    placeholder="도착역" 
                />

                <button>검색</button>
            </div>
        </>
    )
}

export default RouteSearch;