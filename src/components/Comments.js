import React from 'react';
import {AiOutlineComment} from 'react-icons/ai'
import styled from 'styled-components';

export default function Comments({setExpendedComments,expendedComments}){
    function comments(){
        if(expendedComments){
            setExpendedComments(false)
        }else{
            setExpendedComments(true)
        }
    }
    return (
    <Container  onClick={()=>comments()}>
        <Icon>
            <AiOutlineComment/>
        </Icon>
       <h6>10 comments</h6>
    </Container>)
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top:10px;
    
    h6{
        font-size: 11px;
        color:#fff;
        text-align: center;
    }
`
const Icon = styled.div`
    font-size: 20px;
    color:#fff;
`