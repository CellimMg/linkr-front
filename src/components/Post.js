import styled from 'styled-components';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import url from '../repositories/server.js';
import userContext from '../context/userContext.js'



export default function Post(props){
    const dataPost = (props.postData)
    const [liked, setLiked] = React.useState(false)
    const user = JSON.parse(localStorage.user)
    const [load,setLoad] = React.useState(true)
    const [countLikes, setCountLikes] = React.useState(dataPost.likes)
    const [usersLikes,setUsersLikes]  = React.useState('')
    const config ={
        headers:{
            Authorization: `Bearer ${user.data.token}` 
        }
    }
    function like(postId){
        setLoad(true)
        const body ={
            userId:user.data.id,
            postId
        }
        if(liked){
            const promise = axios.delete(`${url}/unlike`,{data:body,config})
            promise
                .then(()=>{
                    setLoad(false)
                    setLiked(false)
                    setCountLikes(countLikes - 1)
                    setUsersLikes(prev => prev.filter(me=>me !== 'Você'))
                })
                .catch(()=>{
                    setLiked(false)
                })
            
        }else{
            const promise = axios.post(`${url}/like`,body,config)
            promise
                .then(()=>{
                    setLoad(false)
                    setLiked(true)
                    setCountLikes(countLikes + 1)
                    setUsersLikes((e)=> ['Você',...e])
                })
                .catch(()=>{
                    setLiked(false)
                })
        }
        
    }
    
    function getLikes(){
        const whoLikes = axios.get(`${url}/likes/${dataPost.postId}/${user.data.id}`)
        whoLikes.then((res)=>{
            setUsersLikes(res.data.names)
            if(res.data.names.length > 2){
                console.log('maior')
                setUsersLikes([res.data.names[0], res.data.names[1],`outras ${res.data.numero - 2} pessoas`])   
            }
        })
        const promise = axios.get(`${url}/like/${user.data.id}/${dataPost.postId}`,config)
        promise.then((res)=>{
            setLoad(false)
            if(res.data){    
                setLiked(true)    
            }
        })
        
    }
    React.useEffect(()=>{
        getLikes()
    },[])
    function doNothin(){
        //foi de proposito isso
    }
    return(
        <Container>
            <Left>
                <img src={dataPost.userImage} alt='profile'></img>
                <Icon onClick={(e)=> {load?doNothin():like(dataPost.postId)}} > 
                    {liked? <AiFillHeart color='red'/>:<AiOutlineHeart />} 
                    <p data-tip={usersLikes} > {countLikes} {countLikes <= 1? <>like</>:<>likes</>}</p>   
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