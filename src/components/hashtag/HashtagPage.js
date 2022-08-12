import React from "react";
import styled from "styled-components";
import Post from "../Post";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from "react-scroll-to-top";
import TopBar from '../TopBar';
import Trending from "./Trending.js";

export default function HashtagPage() {
    const [hashtagData, setHashtagData] = React.useState()
    const [load, setLoad] = React.useState(true)
    let { hashtag } = useParams()

    React.useEffect(() => {
        getPosts()
    }, [hashtag])

    function getPosts() {
        const promise = axios.get(`http://localhost:4000/timeline/${hashtag}`)
        promise.then((req) => {
            setHashtagData(req.data)
            setLoad(false)
        })
    }
    function loadPosts(e, index) {
        const postsData = {
            postId: hashtagData.id,
            userId: e.userId,
            userName: hashtagData.username,
            userImage: hashtagData.userImage,
            link: e.link,
            description: e.description
        }
        return <Post postData={postsData} key={index} />
    }
    return (<>

        {load ? <></> :
        
        <Container>
            <Leftcontainer>
                <TopBar />
                <Head>
                    <h1># {hashtag}</h1>
                </Head>
                <Content>
                    {hashtagData.map((e, index) => loadPosts(e, index))}
                </Content>

                <ScrollToTop smooth style={{ background: "rgba(35, 34, 34,0.3)" }} />
            </Leftcontainer>

            <Rightcontainer>
                <Trending/>
            </Rightcontainer>
        </Container>
        }
    </>)
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top:70px;
`

const Rightcontainer = styled.div`
    width: 30vw;
    display: flex;
    align-items: start;
    justify-content: center;
    margin-top: 0px;
    flex-direction: column;

    @media(max-width:965px) {
        display: none;
    }
    
`

const Leftcontainer = styled.div`
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    flex-direction: column;
`
const Head = styled.div` 
    width: 610px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 40px;
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size:45px;
        color:#fff;
    }
    
}
@media(max-width:610px) {
    width: 100%;
}
`
const Content = styled.div`
    display: flex;
    flex-direction: column;

    @media(max-width:610px) {
    width: 100%;
}
`