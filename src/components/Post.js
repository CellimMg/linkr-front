import styled from 'styled-components';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import url from '../repositories/server.js';


export default function Post(props){
    const dataPost = (props.postData)
    const [liked, setLiked] = React.useState(false)
    const user = JSON.parse(localStorage.user)
    const [load,setLoad] = React.useState(true)
    const [countLikes, setCountLikes] = React.useState(parseInt(dataPost.likes))
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
            const promise = axios.post(`${url}/unlike`,body, config)
            promise
                .then(()=>{
                    setLoad(false)
                    setLiked(false)
                    setCountLikes(countLikes - 1)
                    setUsersLikes(prev => prev.filter(me=>me !== 'Você'))
                    getLikes(postId)
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
                    getLikes(postId)
                })
                .catch(()=>{
                    setLiked(false)
                })
        }
        
    }
    
    function getLikes(postId){
        const whoLikes = axios.get(`${url}/likes/${postId}/${user.data.id}`,config)
        whoLikes.then((res)=>{
            setUsersLikes(res.data.names)
            if(res.data.names.length > 2){
                let text = ''
                        if(res.data.quantyLikes - 2 <= 1){
                            text = `outra ${res.data.quantyLikes - 2} pessoa`
                        }else{
                            text = `outras ${res.data.quantyLikes - 2} pessoas`
                        }
                setUsersLikes([res.data.names[0], res.data.names[1],text])   
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
        getLikes(dataPost.postId)
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
                <div className='postDescription'>
                    <p>{dataPost.description}</p>
                </div>
                <a href={ dataPost.link} target="_blank">
                    <div className='linkBody'>
                        <div className='linkText'>
                            <h2>{dataPost.urlTitle}</h2>
                            <h5>{dataPost.urlDescription}</h5>
                            <h4>{dataPost.link}</h4>
                        </div>
                        <div className='linkImage'>
                            <img src={dataPost.urlImage}/>
                        </div>
                    </div>
                </a>
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
    
    .postDescription {
        height: 52px;
        margin-top: 7px;
    }

    p{
        font-size: 17px;
        color:#B7B7B7;
        line-height: 20px;
        font-weight: 400;
    }


    .linkBody {
        width: 503px;
        height: 155px;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        display: flex;
    }

    .linkText {
        width: 350px;
        padding: 20px 26px 23px 20px;
    }

    .linkImage > img {
        width: 151px;
        height: 153px;
        object-fit:cover;
        border-radius: 0px 12px 13px 0px;
    }

    .linkText > h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #CECECE;

        margin-bottom: 5px;
    }

    .linkText > h4 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        
        color: #CECECE;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .linkText > h5 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        
        color: #9B9595;

        margin-bottom: 13px;

        overflow: hidden;
        text-overflow: ellipsis;
    }
`