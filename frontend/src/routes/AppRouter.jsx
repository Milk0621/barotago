import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../page/home/Home";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/timetable" />
                    <Route path="/search" />
                    <Route path="/lines" />
                    <Route path="/notice" />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;