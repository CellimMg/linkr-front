import {BsSearch} from 'react-icons/bs'
import {DebounceInput} from 'react-debounce-input'
import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



function Results({name,imgProfile,userId,setExpended}){
    const navigate = useNavigate()
    function openProfile(id){
        setExpended(false)
        navigate(`/user/${id}`)
    }
    return (
        <Result onClick={()=> openProfile(userId)} >
            <img src={imgProfile} alt='profile'/>
            <p>{name}</p>
        </Result>
    )
}

export default function SearchBar(){
    const [expended,setExpended] = React.useState(false)
    const [data, setData] =React.useState()
    function search(value){
        if(value !== ''){
            const promise = axios.get(`http://localhost:4000/users?value=${value}`) //teste de rota
            promise.then((req)=> {
                setData(req.data)
                setExpended(true)
            })

        }else{
            setExpended(false)
        }     
    }
    return (
        <Container >
        <Search>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                onChange={e => search(e.target.value)}
                placeholder='Search for people'
                onBlur={()=> setTimeout(()=> setExpended(false),500)}
            ></DebounceInput>
            <BsSearch color='#C6C6C6' size='20px'></BsSearch>   
        </Search>
        {expended?
        <Itens>
            {data.map((e,index)=><Results name={e.name} imgProfile={e.picture_url} userId={e.id} key={index} setExpended={setExpended}/>)}
        </Itens> 
                : <></>} 
    </Container> 
    )
}

const Container = styled.div`
    width: 450px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    height: 45px;
    z-index: 2;
    flex-direction: column;
    
    @media (max-width: 650px) {
        width: 100%;
        position: absolute;
        top:75px;
        left:0

    }
   
`
const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    input{
        width: 360px;
        background: #fff;
        border-radius: 8px 0px 0px 8px;
        height: 40px;
        border:none;
        display: flex;
        flex-wrap: wrap;
        :focus{
            border:none;
            outline: none;
        }
        @media (max-width: 650px) {
        width: 80%;
    }
        
    }
`
const Itens = styled.div`
   max-height: 200px;
   min-height: 200px;
   background-color: #E7E7E7;
   z-index: 1;
   padding: 10px;
   border-radius: 0px 0px 8px 8px;
   overflow: auto;

`
const Result = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    img{
        height: 39px;
        width: 39px;
        margin: 10px;
    }
    p{
        font-family: 'Lato';
        font-size:19px;
    }
`