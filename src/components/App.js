import GlobalStyle from "../globalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/fontsImport.css";
import UserPage from "./UserPage";
import Timeline from "./Timeline";
import React from "react";
import UserContext from "../context/userContext";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import HashtagPage from "./hashtag/HashtagPage.js";

export default function App() {

    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState("")

    return (

        <UserContext.Provider value={{ setToken, token, user, setUser }}>
            <BrowserRouter>
                <GlobalStyle />

                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                </Routes>

            </BrowserRouter>
        </UserContext.Provider>

    )
}