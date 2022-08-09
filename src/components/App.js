import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import "../assets/fontsImport.css";
import Post from "./Post";
import UserPage from "./UserPage";
export default function App(){
    return(
        <BrowserRouter>
        <TopBar></TopBar>
            <Routes>
                <Route path="/" />
                <Route path="/user/:id" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    )
}