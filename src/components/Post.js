import styled from 'styled-components';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';



export default function Post(props){
    const dataPost = (props.postData)
    const [liked, setLiked] = React.useState(false)
    function like(postId){
        const body ={
            userId:1,// teste nao esquecer de mudar
            postId
        }
        if(liked){
            const promise = axios.delete(`http://localhost:4000/unlike`,{data:body})
            
            setLiked(false)
        }else{
            
            const promise = axios.post(`http://localhost:4000/like`,body)
            setLiked(true)
        }
        
    }
    function getLikes(){
    
        const promise = axios.get(`http://localhost:4000/like/${1}/${dataPost.postId}`)// user id para usar
        promise.then((req)=>{
            if(req.data){
                
                setLiked(true)
            }
        })
    }
    React.useEffect(()=>{
        getLikes()
    },[])
    return(
        <Container>
            <Left>
                <img src={dataPost.userImage} alt='profile'></img>
                <Icon onClick={(e)=> like(dataPost.postId)} > 
                    {liked? <AiFillHeart color='red'/>:<AiOutlineHeart />} 
                    <p data-tip='luis,e outros' > 0 likes</p>   
                    <ReactTooltip place='bottom' effect='solid' className='toolTip' arrowColor=' rgba(255, 255, 255, 0.9);d'/>
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
    p{
        font-size: 11px;
        font-family: 'Lato';
        
    }
    .toolTip{
        background: rgba(255, 255, 255, 0.9);
        border-radius: 3px;
        color:#505050;
        font-size: 11px;
        font-family: 'Lato';
        font-weight: 700;
    }
    
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