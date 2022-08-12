import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Trending() {

    const [sessionToken, setSessionToken] = React.useState(sessionStorage.getItem('token'));
    const [trending, setTrending] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [refreshTimeline, setRefreshTimeline] = React.useState(false);

    React.useEffect(() => {

        if(sessionToken){
            setToken({
                headers:{
                    Authorization: `Bearer ` + sessionToken
                }
            })
        }
        const promise = axios.get(`http://localhost:4000/hashtags`, sessionToken);

        promise.then((res) => {
            console.log(res.data);
            setTrending(res.data);
        });
        promise.catch((error) => {
            navigate('/');
        });
    }, []);

    if(refreshTimeline){
        const tl = axios.get(`http://localhost:4000/hashtags`, sessionToken);
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
                <h1>Trending</h1>
                <div>
                    {trending.length ? trending.map( item => { return <Hashtag key={item._id}
                                                                    name={item.hashtag}/>})
                                        : null}
                </div>
            </GeneralContainer>
        </>
    )
}

const GeneralContainer = styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    border-radius: 16px;

    h1 {
        font-size: 27px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        line-height: 64px;
        color: #FFFFFF;
    }
`