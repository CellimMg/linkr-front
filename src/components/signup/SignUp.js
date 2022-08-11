import styledComponents from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { isEmailValid, isNameValid, isPassValid, isPictureValid, showError, signUpUser } from "./SignUpController";
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
                <span>Switch back to login</span>
                <ToastContainer />
            </RightBody>
        </Body>
    );

}

const Body = styledComponents.div`
    width: 100%;
    height: 100%;
    background-color: #151515;
    display: flex;

    @media screen and (max-width: 720px){ 
        flex-flow: column;
    }
    
`;

const LeftBody = styledComponents.div`
    padding-left: 100px;
    padding-bottom: 200px;
    width: 60%;
    height: 100%;
    display: flex;    
    flex-flow: column;
    justify-content: center;

    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;

    div:nth-child(1) span{
        font-family: 'Passion One', cursive;
        font-weight: 700;
        font-size: 106px;
    }

    @media screen and (max-width: 720px){
        height: 25%;
        width: 100%;
        padding: 0px;
        align-items: center;

        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 23px;

        div:nth-child(1) span{
            font-family: 'Passion One', cursive;
            font-weight: 700;
            font-size: 76px;
        }
    }
`;

const RightBody = styledComponents.div`
    width: 40%;
    height: 100%;
    background-color: #333333; 
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    span{
        font-family: 'Lato', sans-serif;
        font-size 20px;
        color: white;
        text-decoration: underline;
    }

    span:hover{
        cursor: pointer;
    }

    @media screen and (max-width: 720px){
        height: 75%;
        width: 100%;
    }
`;

const Form = styledComponents.form`
    width: 100%;
    margin-bottom: 25px;
    padding: 0px 23px;

    input, button{
        font-family: 'Oswald', sans-serif;
        color: #9F9F9F;
        font-size: 22px;
        width: 100%;
        height: 55px;
        background-color: white;
        border-radius: 6px;
        margin-top: 10px;
        border: none;
        padding-left: 17px;
    }

    input::placeholder{
        font-family: 'Oswald', sans-serif;
        color: #9F9F9F;
        font-size: 22px;
    }

    button{
        background-color: ${props => props.loading ? "#A2C7F7" : "#1877F2"};
        color: white;
    }

    button:hover{
        cursor: pointer;
    }
`;