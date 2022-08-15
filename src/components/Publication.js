import React from "react";
import axios from 'axios';
import styled from "styled-components";
import UserContext from "../context/userContext";
import url from '../repositories/server.js';
import { useNavigate, useParams } from "react-router-dom";

export default function Publication (props) {

    const [description, setDescription] = React.useState("");
    const [link, setLink] = React.useState("");
    const { token, setToken } = React.useContext(UserContext);
    const [disable, setDisable] = React.useState(false);
    const [sessionUser, setSessionUser] = React.useState(JSON.parse(localStorage.getItem('user')));

    
    const navigate = useNavigate();

    const sendForm = (event) => {
        setDisable(true);
        event.preventDefault();

        const postData = {
            userId: sessionUser.data.id,
            userImage: sessionUser.data.picture_url,
            username: sessionUser.data.name,
            description,
            link
        }
        if(sessionUser){
            setToken({
                headers:{
                    Authorization: `Bearer ` + sessionUser.data.token
                }
            })
        }
        const promise = axios.post(`${url}/timeline`, postData, token);

        promise.then((res) => {
            setDisable(false);
            setLink("");
            setDescription("");
            props.setRefreshTimeline(true);
            console.log(res.status);
            navigate("/timeline");
        })

        promise.catch((error) => {
            setDisable(false);
            alert("Houve um erro ao publicar seu link");
        })
    }

    return (
        <Card>
            <Left>
                <img src={sessionUser.data.picture_url}></img>
                
            </Left>
            <Right>
                <h1>What are you going to share today?</h1>
                <form onSubmit={sendForm}>
                    <div className="campos">
                        <input type="url" required placeholder="https://..." value={link} onChange={e => setLink(e.target.value)}/>
                        <textarea rows="3" placeholder="Some cool #text" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="btnPublish">
                        <button type="submit" disabled={disable}>{disable ? "Publishing..." : "Publish"}</button>
                    </div>   
                </form>
            </Right>
            
        </Card>
    )
}

const Card = styled.div`
    width: 611px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    display: flex;

    margin-bottom: 13px;

    @media screen and (max-width: 768px) {
        width: 100vw;
        box-shadow: none;
        border-radius: 0; 
    }
`

const Left = styled.div`
    box-sizing: border-box;
    width: 15%;
    heigth: 100%;
    display: flex;
    flex-direction: column;

    img{
        border-radius: 26.5px;
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-top: 18px;
        margin-left: 18px;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`

const Right = styled.div`
    height: 100%;
    margin-top: 10px;
    
    h1 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;

        color: #707070;
        margin-bottom: 20px;
    }

    .campos {
        display: flex;
        flex-direction: column;
    }

    input {
        width: 503px;
        height: 30px;
        background: #EFEFEF;
        border: none;
        border-radius: 5px;
        margin-bottom: 10px;
        padding-left: 10px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */

    }

    input::placeholder {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */


        color: #949494;
    }

    textarea {
        resize: none;
        width: 502px;
        background: #EFEFEF;
        border-radius: 5px;
        margin-bottom: 5px;
        border: none;
        padding-left: 10px;
        margin-bottom: 10px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */


        color: #949494;
    }

    textarea::placeholder {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */


        color: #949494;
    }

    .btnPublish {
        display: flex;
        justify-content: end;
    }

    button {
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        border: none;
        
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */


        color: #FFFFFF;
    }

    
    button:disabled,
    button[disabled]{
        background: #86CCFF;
    }

    @media screen and (max-width: 768px) {
        
        align-items: center;
        justify-content: center;

        h1 {
            font-size: 17px;
            text-align: center;
        }

        .campos {
            width: 100vw;
            align-items: center;

        }

        input {
            width: 96vw;
            height: 30px;
            background: #EFEFEF;
            border: none;
            border-radius: 5px;
            margin-bottom: 10px;
            padding-left: 10px;
    
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-size: 13px;
            line-height: 18px;
            /* identical to box height */
    
        }
        textarea {
            width: 96vw;
            background: #EFEFEF;
            border-radius: 5px;
            margin-bottom: 5px;
            border: none;
            padding-left: 10px;
            margin-bottom: 10px;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-size: 15px;
            line-height: 18px;
            /* identical to box height */
    
    
            color: #949494;
        }

        .btnPublish {
            width: 98vw;
        }
    }
`