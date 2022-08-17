import styled from 'styled-components';
import {FiSend} from 'react-icons/fi';
import React from 'react';
import axios from 'axios';
import url from '../repositories/server.js';

function Comment({data,userPost}){
    const user = JSON.parse(localStorage.user)
    let info = ''
    if(data.id === userPost){
        info = "• post's author"
    }
    return (
        <UserComment>
            <img className='profile' src={user.data.picture_url}  />
            <CommentContent>
                <HeadComment>
                    <h1>{data.author}</h1>
                    <h2>{info}</h2>
                </HeadComment>
                <h3>{data.text}</h3>
            </CommentContent>
        </UserComment>
    )
}

export default function CommentsExpended({postId,dataPost}){
    const user = JSON.parse(localStorage.user)
    const [textComment, setTextComment] = React.useState('')
    const [postData,setPostData] = React.useState(dataPost);
    const [comments, setCommets] = React.useState(dataPost.whoComments)
    const noComments = comments !== null
    const config ={
        headers:{
            Authorization: `Bearer ${user.data.token}` 
        }
    }
    function sendComment(event){
        event.preventDefault();
        const body = {
            userId: user.data.id,
            postId: postId,
            text:textComment
        }
        const promise = axios.post(`${url}/comments`,body,config)
        promise
            .then((res) => {
                setTextComment('')
                setCommets(e => [{
                    author:user.data.name,
                    id:user.data.id,
                    text:textComment 
                },...e])
            })
            .catch(res => console.log(res.response))
    }
    return(
        <>
        <Container>
            <Content>
                {noComments? comments.map((e,index) => <Comment data={e} userPost={dataPost.userId}/>): <>no comments yet</>}
            </Content>
            <DoComment>
                <img className='profile' src={user.data.picture_url} alt='profile'/>
                <Forms onSubmit={event => sendComment(event)}>
                    <input 
                        value={textComment}
                        onChange={(e)=>setTextComment(e.target.value)}
                        placeholder='write a comment...' />
                    <button><FiSend color='#fff' size={15} /></button>
                </Forms>

            </DoComment>
        </Container>
        
        </>)
}

const Container = styled.div`
    background-color: #1E1E1E;
    position: absolute;
    height: 300px;
    width: 611px;
    left: 0;
    top:276px;
    border-radius: 16px;
    padding: 10px 20px 15px 20px;
    
    .profile{
        height: 39px;
        width: 39px;
        margin: 0;
    }
    @media (max-width: 610px){
        width: 100%;
    }
    
`
const DoComment = styled.div`
    height: 85px;
    border-top: 1px solid #353535;
    display: flex;
    align-items: center;

   
`
const Content = styled.div`
    height: 200px;
    overflow: scroll;
`
const Forms = styled.form`
    background-color: #252525;
    height: 40px;
    width: 510px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    margin-left: 10px;
    input{
        height: 40px;
        width: 80%;
        background-color: #252525;
        border:none;
        border-radius: 8px;
        padding:10px;
        color:#fff;
        :focus{
            border:none;
            outline: none;
        }
    }
    button{
        border:none;
        background-color: #252525;
        cursor: pointer;
    }
    @media (max-width: 610px){
        width: 100%;
    }
`
const UserComment = styled.div`
    height: 70px;
    border-bottom: 1px solid #353535;
    display: flex;
`
const CommentContent = styled.div`
    margin-left: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    h3{
        color: #ACACAC;
    }

`
const HeadComment = styled.div`
    display: flex;
    h1{
        font-weight: 700;
        color:#F3F3F3
    }
    h2{
        color:#565656

    }
   
`