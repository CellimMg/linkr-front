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
