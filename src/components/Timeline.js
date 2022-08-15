import React from "react";
import styled from "styled-components";
import Post from "./Post";
import Publication from "./Publication";
import axios from 'axios';
import TopBar from "./TopBar";
import UserContext from "../../context/userContext.js";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import url from '../repositories/server.js';
import Trending from "./hashtag/Trending";


export default function Timeline() {

    const [sessionUser, setSessionUser] = React.useState(JSON.parse(localStorage.user));
    const [postData, setpostData] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [refreshTimeline, setRefreshTimeline] = React.useState(false);
    const [message, setMessage] = React.useState("Loading...");

    const navigate = useNavigate();
    
    const config ={
        headers:{
            Authorization: `Bearer ${sessionUser.data.token}` 
        }
    }

    React.useEffect(() => {
        const promise = axios.get(`${url}/timeline`, config);

        promise.then((res) => {
            console.log(res.data);
            setpostData(res.data);
            if(postData.length === 0){
                setMessage("There are no posts yet");
            }
        });
        promise.catch((error) => {
            alert("An error ocurred while trying to fetch the posts, please refresh the page");
        });


    }, []);

    if(refreshTimeline){
        const tl = axios.get(`${url}/timeline`, config);
        tl.then((res) => {
            console.log(res.data);
            setpostData(res.data);
            setRefreshTimeline(false);
        });
        tl.catch((error) => {
            setRefreshTimeline(false);
        });
    }

    function loadPosts(postData, index) {
        const postsData = {
            userId: postData.userId,
            userName: postData.username,
            userImage: postData.userImage,
            postId: postData.postId,
            link: postData.link,
            description: postData.description,
            urlTitle: postData.urlTitle,
            urlImage: postData.urlImage,
            urlDescription: postData.urlDescription,
            likes:postData.likes

        }
        return <Post postData={postsData} setRefreshTimeline={setRefreshTimeline} key={index} />
    }

    return (
        <>
            <GeneralContainer>
                <TopBar userImage={localStorage.getItem('user') === null? <span>dummy</span> : sessionUser.data.picture_url}/>
                <div className="head">
                    <div className="timeline">
                        <h1>timeline</h1>
                    </div>
                    <Publication setRefreshTimeline={setRefreshTimeline}/>
                </div>
                <div className="content">
                    <div className="posts">
                        {
                            postData.length === 0 ?
                            <h1 className="message">{message}</h1>
                            :
                            postData.map((e, index) => loadPosts(e, index))
                        }
                    </div>  
                <Trending/>
                </div>
                 
            </GeneralContainer>
           
        </>
    )
}

const GeneralContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    overflow-y: scroll;
    
    .timeline {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        width: 100%;
        margin-bottom: 44px;
        display: flex;
        align-items: baseline;
        align-text: baseline;
    }

    .message {
        margin-top: 200px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        /* identical to box height */


        color: #FFFFFF;

    }
    .posts{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content{
        display: flex;
    }
    .head{
        width: 930px;
    }
    @media (max-width: 930px) {
        .head{
            width: 610px;
        }
        
    }
    @media (max-width: 768px){
        padding-top: 80px;

        .timeline {
            font-size: 33px;
            line-height: 49px;
            margin-bottom: 20px;
            margin-top: 70px;
            padding-left: 10px;
        }
        .posts{
            width: 100%;
        }
        .content{
            width:100%;
        }
        .head{
            width: 100%;
        }
    }
    
`