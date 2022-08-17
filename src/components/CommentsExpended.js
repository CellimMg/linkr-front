import styled from 'styled-components';
import {FiSend} from 'react-icons/fi';

function Comment(){
    const user = JSON.parse(localStorage.user)
    return (
        <UserComment>
            <img className='profile' src={user.data.picture_url}  />
            <CommentContent>
                <HeadComment>
                    <h1>nome</h1>
                    <h2>• info de follower</h2>
                </HeadComment>
                <h3>comentario</h3>
            </CommentContent>
        </UserComment>
    )
}

export default function CommentsExpended(){
    const user = JSON.parse(localStorage.user)
    return(
        <>
        <Container>
            <Content>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </Content>
            <DoComment>
                <img className='profile' src={user.data.picture_url} />
                <Forms>
                    <input placeholder='write a comment...'></input>
                    <FiSend color='#fff' size={15} />
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