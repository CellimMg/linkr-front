import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Body from "../commom/Body";
import Form from "../commom/Form";
import LeftBody from "../commom/LeftBody";
import RightBody from "../commom/RightBody";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from "react";
import UserContext from "../../context/userContext.js";
import { isEmailValid, isPassValid, signInUser } from "./SignInController";
import { showError } from "../../utils/alerts";

export default function SignIn() {

    const navigate = useNavigate();
    const [fEmail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    async function submitForm(event) {
        setLoading(true);
        event.preventDefault();
        if (isEmailValid(fEmail) && isPassValid(password)) {
            try {
                const response = await signInUser({ email: fEmail, password });

                localStorage.setItem("user", JSON.stringify(response));
                setUser(response);

                navigate("/timeline");
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
                    <button>Log In</button>
                </Form>
                <span onClick={() => navigate("/signup")}>First time? Create an account!</span>
                <ToastContainer />
            </RightBody>
        </Body>
    );

}







