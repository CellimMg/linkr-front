import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../globalStyle.js";
import SignUp from "./signup/SignUp.js";


export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}