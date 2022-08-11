import styled from 'styled-components';
import React from 'react';
import SearchBar from './SearchBar';

export default function TopBar(){


    return(
        <Top>
            <Main>
            <h1>linkr</h1>
             <SearchBar></SearchBar>
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
            </Main>
        </Top>
    )
}

const Top = styled.div`
width: 100vw;
height: 70px;
background-color: #151515;
display: flex;
flex-direction: column;
align-items: center;
padding:10px 30px 0px;
z-index: 1;
position: fixed;
left: 0;
top: 0;

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
    @media (max-width: 650px) {
      position: absolute
    }


` 
const Main = styled.div`
    display:flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 650px) {
       margin-bottom: 20px;
    }

`