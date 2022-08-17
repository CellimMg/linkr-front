import styled from 'styled-components';
import {AiOutlineHeart,AiFillHeart, AiOutlineEdit} from 'react-icons/ai';
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import url from '../repositories/server.js';
import userContext from '../context/userContext.js';
import Swal from 'sweetalert2';
import Comments from './Comments.js';
import CommentsExpended from './CommentsExpended.js';


export default function Post(props){
    const dataPost = (props.postData)
    const [liked, setLiked] = React.useState(false)
    const user = JSON.parse(localStorage.user)
    const [load,setLoad] = React.useState(false);
    const [editable, setEditable] = React.useState(true);
    const [description, setDescription] = React.useState(props.postData.description);
    const inputRef = React.useRef();
    const [countLikes, setCountLikes] = React.useState(parseInt(dataPost.likes))
    const [usersLikes,setUsersLikes]  = React.useState('')
    const [expendedComments , setExpendedComments] = React.useState(false)
    
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
        if(dataPost.whoLikes !== null){
            dataPost.whoLikes.map((element)=>{
                if(element.id !== user.data.id){
                    setUsersLikes((e)=> [element.name,...e])
                    
                }else{
                    setUsersLikes((e)=> ['Você',...e])
                    setLiked(true)
                }
            })
            if(dataPost.whoLikes.length > 2){
                let text = ''
                        if(dataPost.likes - 2 <= 1){
                            text = `outra ${dataPost.likes- 2} pessoa`
                        }else{
                            text = `outras ${dataPost.likes- 2} pessoas`
                        }
                    setUsersLikes((e)=> [e[0], e[1],text])   
                }
        }
        
    }
    React.useEffect(()=>{
        getLikes()

    },[])
    function doNothin(){
        //foi de proposito isso
    }

    function handleKeyDown (event) {
        if(event.key === 'Enter'){
            setEditable(!editable);
            const payload = {
                description
            }
            const promise = axios.patch(`${url}/timeline/${dataPost.postId}`, payload, config);
            promise.then((res) => {
                props.setRefreshTimeline(true);
            })
            promise.catch((err) => {
                alert("Houve um problema, tente novamente");
                setEditable(!editable);
            })
        }else if(event.key === 'Escape'){
            setDescription(dataPost.description);
            setEditable(!editable);
        }
    }
    function deleteModal () {
        return (
            Swal.fire({
                title: "<h5 style='color:white'>" + 'Are you sure you want to delete this post?' + "</h5>",
                icon: 'warning',
                showCancelButton: true,
                background: '#333333',
                fontColor: 'white',
                confirmButtonColor: '#1877F2',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${url}/timeline/${dataPost.postId}`, config).then((res) => {
                        props.setRefreshTimeline(true);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    }).catch((err) => {
                        Swal.fire(
                            'Erro!',
                            'Houve um erro ao tentar deletar seu post.',
                            'error'
                        )
                    })

                }
              })
        )
    }

    return(
        <>
        <Container comments={expendedComments? '310px': '10px'}>
            <Left>
                <img src={dataPost.userImage} alt='profile'></img>
                <Icon onClick={(e)=> {load?doNothin():like(dataPost.postId)}} > 
                    {liked? <AiFillHeart color='red'/>:<AiOutlineHeart/>} 
                    <h6 data-tip={usersLikes} > {countLikes} {countLikes <= 1? <>like</>:<>likes</>}</h6>   
                    <ReactTooltip place='bottom' effect='solid' className='toolTip' arrowColor=' rgba(255, 255, 255, 0.9);d'/>
                </Icon>
                
                    {expendedComments?<> <Comments setExpendedComments={setExpendedComments} expendedComments={expendedComments}/><CommentsExpended postId={dataPost.postId} dataPost={dataPost}/></>:<Comments setExpendedComments={setExpendedComments}
                    expendedComments={expendedComments}/>}
               
            </Left>
            <Content editable={editable}>
                <div className='topo'>
                    <Link to={`/user/${dataPost.userId}`}><h1>{dataPost.userName}</h1></Link>
                    <div>
                        {dataPost.userId === user.data.id ? <><AiOutlineEdit color='white' size='24px' onClick={() => [setEditable(!editable), inputRef.current.focus()]}/> <IoTrashOutline color='white' size='24px' onClick={deleteModal}/></> : <span></span>}
                    </div>
                </div>
                <div className='postDescription'>
                    <textarea readOnly={editable}  onBlur={() => [console.log(dataPost.description), setDescription(props.postData.description)]} onChange={(event) => setDescription(event.target.value)} value={description} onKeyDown={handleKeyDown} ref={inputRef}/>
                </div>
                <a href={dataPost.link} target="_blank">
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
            
        </>
        
    )
}

const Container = styled.div`
    width: 611px;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    padding: 15px 15px 15px 5px;
    display: flex;
    margin-bottom: ${props => props.comments};
    position: relative;

    a{
        text-decoration: none;
    }
    @media (max-width: 610px){
        width: 100%;
    }
`
const Left = styled.div`
    width: 86px;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    h6{
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
    @media (max-width: 610px){
        width: 40px;
        img{
            width: 40px;
            height: 40px;
        }
        h6{
            font-size:9px;
        }
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

    .topo {
        display: flex;
        justify-content: space-between;
    }

    h1{
        font-size:20px;
        color:#fff;
        line-height: 23px;
        font-weight: 400;
    }
    
    .postDescription {
        height: 52px;
        margin-top: 7px;
        width: 85%;
        font-size: 17px;
        color:#B7B7B7;
        line-height: 20px;
        font-weight: 400;
        border-radius: 13px;
        border: none; 
    }

    .linkBody {
        width: 100%;
        height: 155px;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        display: flex;
    }

    .linkText {
        width: 70%;
        padding: 20px 26px 23px 20px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .linkImage > img {
        width: 151px;
        height: 100%;
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
        width: 100%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        color: #CECECE;
        overflow: hidden;
        text-overflow: ellipsis;  
        word-break: break-all;
    }

    .linkText > h5 {
        width: 100%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        color: #9B9595;
        margin-bottom: 13px;
        word-break: break-all;
    }

    textarea {
        resize: none;
        width: 100%;
        border: none;
        background-color: ${props => props.editable ? '#171717' : '#white'};
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }

    @media (max-width: 610px){
        .linkImage > img{
            width:75px;
                }
        .linkText{
            padding: 5px 1px 5px 10px;
        }
        .linkText > h2{
            font-size: 11px;
        }
        .linkText > h4{
            font-size: 9px;
        }
        .linkText > h5{
            font-size: 9px;
        }
    }
`
