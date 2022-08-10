import {BsSearch} from 'react-icons/bs'
import {DebounceInput} from 'react-debounce-input'
import styled from 'styled-components';
import React from 'react';
import axios from 'axios';

function Results({name}){
    return (
        <Result>
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png' />
            <p>{name}</p>
        </Result>
    )
}

export default function SearchBar(){
    const [expended,setExpended] = React.useState(false)
    const [data, setData] =React.useState()
    function search(value){
        const body = {
            value
        }
        if(value !== ''){
            const promise = axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40',body)
            promise.then((req)=> {
                setData(req.data)
                setExpended(true)
                console.log(req.data)
            })

        }else{
            setExpended(false)
        }     
    }
    return (
        <Container>
        <Search>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                onChange={e => search(e.target.value)}
                placeholder='Search for people'
                onBlur={()=> setExpended(false)}
            ></DebounceInput>
            <BsSearch color='#C6C6C6' size='20px'></BsSearch>
        </Search>
        {expended?<Itens>{data.results.map((e,index)=><Results name={e.name} key={index}/>)}</Itens> : <></>} 
    </Container> 
    )
}

const Container = styled.div`
    width: 500px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    height: 45px;
    z-index: 2;
    flex-direction: column;
    
    @media (max-width: 610px) {
        display: none;
    }
   
`
const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    input{
        width: 400px;
        min-width: 365px;
        background: #FFFFFF;
        border-radius: 8px 0px 0px 8px;
        height: 40px;
        border:none;
        display: flex;
        flex-wrap: wrap;
        :focus{
            border:none;
            outline: none;
        }
    }
`
const Itens = styled.div`
   background-color: #E7E7E7;
   z-index: 1;
   padding: 10px;
    min-height: 200px;
   overflow: scroll;
   border-radius: 0px 0px 8px 8px;

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