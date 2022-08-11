import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import "../assets/fontsImport.css";
import Post from "./Post";
import UserPage from "./UserPage";
import Timeline from "./Timeline";
import React from "react";
import UserContext from "../context/userContext";

export default function App(){

    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState("")
    const [url, setUrl] = React.useState('https://driven-fast-market.herokuapp.com/');

    return(
        <UserContext.Provider value={{setToken, token, url, setUrl, user, setUser}}>
            <BrowserRouter>
            <TopBar></TopBar>
                <Routes>
                    <Route path="/" />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>
            </BrowserRouter>
            
        </UserContext.Provider>

    )
}