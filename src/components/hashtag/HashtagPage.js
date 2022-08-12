import React from "react";
import styled from "styled-components";
import Post from "./Post";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Timeline() {

    const [sessionToken, setSessionToken] = React.useState(sessionStorage.getItem('token'));
    const [posts, setPosts] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [refreshTimeline, setRefreshTimeline] = React.useState(false);

    const navigate = useNavigate();
    const { hashtag } = useParams();

    React.useEffect(() => {

        if(sessionToken){
            setToken({
                headers:{
                    Authorization: `Bearer ` + sessionToken
                }
            })
        }
        const promise = axios.get(`http://localhost:4000/timeline/${hashtag}`, sessionToken);

        promise.then((res) => {
            console.log(res.data);
            setPosts(res.data);
        });
        promise.catch((error) => {
            navigate('/');
        });
    }, []);

    if(refreshTimeline){
        const tl = axios.get(`http://localhost:4000/timeline/${hashtag}`, sessionToken);
        tl.then((res) => {
            console.log(res.data);
            setPosts(res.data);
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
                <h1 className="timeline"># ${hashtag}</h1>
                <div>
                    <Post />
                </div>
                
            </GeneralContainer>
        </>
    )
}

const GeneralContainer = styled.div`
    background-color: #333333;
    width: 100%;
    height: 100vh;
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: -1;
    
    .timeline {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;

        margin-bottom: 44px;
    }

    @media (max-width: 768px){

        padding-top: 80px;
        align-items: baseline;

        .timeline {
            font-size: 33px;
            line-height: 49px;
            margin-bottom: 20px;
            margin-left: 17px;
        }
    }
`