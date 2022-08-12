import GlobalStyle from "../globalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/fontsImport.css";
import UserPage from "./UserPage";
import Timeline from "./Timeline";
import React from "react";
import UserContext from "../context/userContext";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";

export default function App() {

    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState("")
    const [url, setUrl] = React.useState('https://driven-fast-market.herokuapp.com/');

    return (

        <UserContext.Provider value={{ setToken, token, url, setUrl, user, setUser }}>
            <BrowserRouter>
                <GlobalStyle />

                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>

            </BrowserRouter>
        </UserContext.Provider>

    )
}