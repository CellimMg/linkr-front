import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input'
import React from 'react';
import axios from 'axios';
import {BsSearch} from 'react-icons/bs'

export default function TopBar(){
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

        }
       setExpended(false)
        
    }
    return(
        <Top>
            <h1>linkr</h1>
            <Container teste={expended? '45px' : '45px'}>
                <Search>
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        onChange={e => search(e.target.value)}
                        placeholder='Search for people'
                    ></DebounceInput>
                    <BsSearch color='#C6C6C6' size='20px'></BsSearch>
                </Search>
                {expended?<Itens>{data.results.map((e)=><p>{e.name}</p>)}</Itens> : <></>}
                
                
            </Container>
                
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
        </Top>
    )
}

const Top = styled.div`
height: 70px;
background-color: #151515;
display: flex;
padding:10px 30px 0px;
justify-content: space-between;
z-index: 1;

h1{
    font-family: 'Passion One';
    color:#fff;
    font-size: 49px;
    font-weight: 700;
}
img{
    border-radius: 26.5px;
    width: 53px;
    height: 53px;
    object-fit: cover;
}


` 
const Container = styled.div`
    width: 500px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    height: ${props => props.teste };
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
