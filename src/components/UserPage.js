import styled from 'styled-components'
import Post from './Post';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserPage(){
    const [userData, setUserData] = React.useState()
    const [load,setLoad] = React.useState(true)
    let {id} = useParams()

    React.useEffect(()=> {
        getPosts()
    },[id])

    function getPosts(){
        const promise = axios.get(`http://localhost:4000/user/${id}`)
        promise.then((req) => {
            setUserData(req.data)
            setLoad(false)  
        })
    }
    
    return (<>
        {load? <></>:
        <Container>
            <Head>
                <img src={userData.picture} alt='perfil'></img>
                <h1>{userData.name}'s posts</h1>
            </Head>
            <Content>
                {userData.posts.map((e)=><Post></Post>)}
            </Content>
            
           
        </Container>}
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
    img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 15px;
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