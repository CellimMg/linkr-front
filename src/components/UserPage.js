import styled from 'styled-components'
import Post from './Post';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import TopBar from './TopBar';
import url from '../repositories/server.js';
import Trending from '../components/hashtag/Trending.js'
import UserContext from '../context/userContext.js';


export default function UserPage() {
    const [userData, setUserData] = React.useState()
    const [load, setLoad] = React.useState(true)
    const user = JSON.parse(localStorage.user)
    let { id } = useParams();

    const config ={
        headers:{
            Authorization: `Bearer ${user.data.token}` 
        }
    }

    React.useEffect(() => {
        getPosts()
    }, [id])

    function getPosts() {
        const promise = axios.get(`${url}/user/${id}`,config)
        promise
            .then((req) => {
                setUserData(req.data)
                setLoad(false)
            })
            .catch(error =>console.log(error.response.data))
    }
    function loadPosts(e, index) {
        const postsData = {
            userId: id,
            userName: userData.name,
            userImage: userData.picture,
            postId: e.postId,
            link: e.link,
            description: e.description,
            urlTitle: e.urlTitle,
            urlImage: e.urlImage,
            urlDescription: e.urlDescription,
            likes:parseInt(e.likes),
            whoLikes: e.whoLikes,
            whoComments:e.whoComments
        }
       
        
        return <Post postData={postsData} key={index} />
    }
    return (<>

        {load ? 
        <>
            <TopBar />
        </> :
        <>
            <Container>
                <TopBar />
                <Head>
                    <img src={userData.picture} alt='perfil'></img>
                    <h1>{userData.name}'s posts</h1>
                </Head>
                <Main>
                    <Content>
                        {userData.posts.length === 0?<p>Nothing yet</p>:(userData.posts.reverse()).map((e, index) => loadPosts(e, index))}
                    </Content>
                    <Trending />
                </Main>
                
                
                <ScrollToTop smooth style={{ background: "rgba(35, 34, 34,0.3)" }} />
            </Container>
            
            </>}
    </>)
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top:70px;
    flex-direction: column;
`
const Head = styled.div` 
    width: 930px;
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
    img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 15px;
}
@media(max-width:930px) {
    width: 100%;
}
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    p{
        font-family: 'Lato';
        width: 610px;
        font-size: 18px;
        text-align: center;
        color: #fff;
    }

    @media(max-width:710px) {
    width: 100%;
    p{
        width: 100%;
    }
}
`
const Main = styled.div`
    display: flex;
    justify-content: center;
    @media(max-width:710px) {
    width: 100%;
}
    
      
    
`