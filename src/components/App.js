import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import "../assets/fontsImport.css";
import Post from "./Post";
import UserPage from "./UserPage";
import Timeline from "./Timeline";
export default function App(){
    return(
        <BrowserRouter>
        <TopBar></TopBar>
            <Routes>
                <Route path="/" />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/timeline" element={<Timeline />} />
            </Routes>
        </BrowserRouter>
    )
}