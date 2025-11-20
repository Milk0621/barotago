import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../page/home/Home";
import Search from "../page/search/Search";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/timetable" />
                    <Route path="/search" element={<Search />} />
                    <Route path="/notice" />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;