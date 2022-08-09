import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import "../assets/index.css"
export default function App(){
    return(
        <BrowserRouter>
        <TopBar></TopBar>
            <Routes>
                <Route path="/" />
            </Routes>
        </BrowserRouter>
    )
}