import styled from 'styled-components';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Post(props){
    const dataPost = (props.postData)
    const [liked, setLiked] = React.useState(false)
    function like(postId){
        if(liked){
            setLiked(false)
        }else{
            setLiked(true)
        }
        
    }
    return(
        <Container>
            <Left>
                <img src={dataPost.userImage} alt='profile'></img>
                <Icon onClick={(e)=> like()}> 
                    {liked? <AiFillHeart color='red'/>:<AiOutlineHeart />}    
                </Icon>
            </Left>
            <Content>
                <Link to={`/user/${dataPost.userId}`}><h1>{dataPost.userName}</h1></Link>
                <p>{dataPost.description}</p>
            </Content>
                
        </Container>
    )
}

const Container = styled.div`
    width: 610px;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    padding: 15px;
    display: flex;
    margin-bottom: 15px;

    a{
        text-decoration: none;
    }
    @media (max-width: 610px){
        width: 100%;
    }
`
const Left = styled.div`
    width: 60px;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: 18px;
    
img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 20px;
}
`
const Icon = styled.div`
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    :active{
        transform: translateY(4px);
    }
    
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    font-family: 'Lato';
    h1{
        font-size:20px;
        color:#fff;
        line-height: 23px;
        font-weight: 400;
    }
    p{
        font-size: 17px;
        color:#B7B7B7;
        line-height: 20px;
        font-weight: 400;
    }
`