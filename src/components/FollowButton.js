import React from "react";
import styled from "styled-components";

export default function FollowButton() {
    const [sessionUser, setSessionUser] = React.useState(JSON.parse(localStorage.user));
    const [follows, setFollow] = React.useState(false);

    //requisicoes GET >> seta follows como TRUE ou FALSE
    //POST (no post vai os dados de follower e followed, e tbm o status 'follows'como TRUE ou FALSE)
    //o back vai adicionar ou deletar a relacao na tabela 'follows'

    return(
        <Button>
            { follows ? <h3>Unfollow</h3> : <h3>Follow</h3> }
        </Button>

    );
}

const Button = styled.div`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    display: flex;
    justify-content: center;
    align-items: center;

    h3{
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        color: #FFFFFF;
    }
`