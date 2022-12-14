import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Body from "../commom/Body";
import Form from "../commom/Form";
import LeftBody from "../commom/LeftBody";
import RightBody from "../commom/RightBody";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { isEmailValid, isNameValid, isPassValid, isPictureValid, signUpUser } from "./SignUpController";
import { showError } from "../../utils/alerts";

export default function SignUp() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false);

    async function submitForm(event) {
        setLoading(true);
        event.preventDefault();
        if (isEmailValid(email) && isPassValid(password) && isNameValid(userName) && isPictureValid(picture)) {
            try {
                await signUpUser(email, password, userName, picture);
                navigate("/");
            } catch (error) {
                showError(error.response.data.message);
            }
        }
        setLoading(false);
    }

    return (
        <Body>
            <LeftBody>
                <div><span>linkr</span></div>
                <div><span>save, share and discover<br />
                    the best links on the web</span></div>
            </LeftBody>
            <RightBody>
                <Form onSubmit={loading ? () => { } : submitForm} loading={loading}>
                    <input onChange={e => setEmail(e.target.value)} type={"email"} placeholder="e-mail"></input>
                    <input onChange={e => setPassword(e.target.value)} type={"password"} placeholder="password"></input>
                    <input onChange={e => setUserName(e.target.value)} type={"text"} placeholder="username"></input>
                    <input onChange={e => setPicture(e.target.value)} type={"url"} placeholder="picture url"></input>
                    <button>Sign Up</button>
                </Form>
                <span onClick={() => navigate("/")}>Switch back to login</span>
                <ToastContainer />
            </RightBody>
        </Body>
    );

}







