import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import "../assets/fontsImport.css";
import Post from "./Post";
export default function App(){
    return(
        <BrowserRouter>
        <TopBar></TopBar>
        <Post></Post>
            <Routes>
                <Route path="/" />
            </Routes>
        </BrowserRouter>
    )
}