import styled from 'styled-components';
import React from 'react';
import SearchBar from './SearchBar';

export default function TopBar(){
    return(
        <Top>
            <h1>linkr</h1>
             <SearchBar></SearchBar>
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
        </Top>
    )
}

const Top = styled.div`
width: 100vw;
height: 70px;
background-color: #151515;
display: flex;
padding:10px 30px 0px;
justify-content: space-between;
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
    input{
        width: 560px;
        min-width: 375px;
        max-width:560px;
        background: #FFFFFF;
        border-radius: 8px;
        height: 45px;
        border:none;
        display: flex;
        flex-wrap: wrap;
        @media (max-width: 610px) {
            display: none;
        }
    }


` 
