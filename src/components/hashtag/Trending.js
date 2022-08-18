import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Hashtag from "./Hashtag.js";
import url from '../../repositories/server.js';

export default function Trending() {

    const [sessionToken, setSessionToken] = React.useState(sessionStorage.getItem('token'));
    const [trending, setTrending] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [refreshTimeline, setRefreshTimeline] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {

        if(sessionToken){
            setToken({
                headers:{
                    Authorization: `Bearer ` + sessionToken
                }
            })
        }
        const promise = axios.get(`${url}/hashtags`, sessionToken);

        promise.then((res) => {
            console.log(res.data);
            setTrending(res.data);
        });
        promise.catch((error) => {
            navigate('/');
        });
    }, []);

    if(refreshTimeline){
        const tl = axios.get(`${url}/hashtags`, sessionToken);
        tl.then((res) => {
            console.log(res.data);
            setTrending(res.data);
            setRefreshTimeline(false);
        });
        tl.catch((error) => {
            setRefreshTimeline(false);
            navigate('/');
        });
    }
    return (
        <>
            <GeneralContainer>
            <ToastContainer />
                <h1>trending</h1>
                <div>
                    {trending.length ? trending.map( (item, index) => { return <Hashtag key={index}
                                                                    name={item.hashtag}/>})
                                        : <></>}
                </div>
            </GeneralContainer>
        </>
    )
}

const GeneralContainer = styled.div`
    background-color: #171717;
    width: 301px;
    height: fit-content;
    border-radius: 16px;
    padding-top: 10px;
    padding-bottom: 25px;
    padding-left: 16px;
    margin-left: 20px;
    

    h1 {
        font-size: 27px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        line-height: 64px;
        color: #FFFFFF;
    }

    p {
        font-size: 19px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        line-height: 35px;
        color: #FFFFFF;
    }
    @media(max-width:930px) {
            display: none;
}

`
