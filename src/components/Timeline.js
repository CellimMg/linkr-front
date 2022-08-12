import React from "react";
import styled from "styled-components";
import Post from "./Post";
import Publication from "./Publication";
import axios from 'axios';
import TopBar from "./TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Timeline() {

    const [sessionUser, setSessionUser] = React.useState(localStorage.getItem('user'));
    const [userData, setUserData] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [refreshTimeline, setRefreshTimeline] = React.useState(false);
    let { id } = useParams()

    const navigate = useNavigate();

    React.useEffect(() => {

        if(sessionUser){
            setToken({
                headers:{
                    Authorization: `Bearer ` + sessionUser.token
                }
            })
        }
        const promise = axios.get(`http://localhost:4000/timeline`, sessionUser);

        promise.then((res) => {
            console.log(res.data);
            setUserData(res.data);
        });
        promise.catch((error) => {
            navigate('/');
        });
    }, []);

    if(refreshTimeline){
        const tl = axios.get(`http://localhost:4000/timeline`, sessionUser);
        tl.then((res) => {
            console.log(res.data);
            setUserData(res.data);
            setRefreshTimeline(false);
        });
        tl.catch((error) => {
            setRefreshTimeline(false);
            navigate('/');
        });
    }

    function loadPosts(userData, index) {
        const postsData = {
            userId: userData.userId,
            userName: userData.username,
            userImage: userData.userImage,
            postId: userData.postId,
            link: userData.link,
            description: userData.description
        }
        return <Post postData={postsData} key={index} />
    }

    return (
        <>
            <GeneralContainer>
            <TopBar />
                <h1 className="timeline">Timeline</h1>
                <div>
                    <Publication setRefreshTimeline={setRefreshTimeline}/>
                </div>
                <div>
                    {userData.map((e, index) => loadPosts(e, index))}
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
    overflow-y: scroll;
    
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