import React from "react";
import axios from 'axios';
import styled from "styled-components";
import url from '../repositories/server.js';

//requisicoes GET >> seta follows como TRUE ou FALSE
//POST (no post vai os dados de follower e followed, e tbm o status 'follows'como TRUE ou FALSE)
//o back vai adicionar ou deletar a relacao na tabela 'follows'

export default function FollowButton( { followedId } ) {
    const [sessionUser, setSessionUser] = React.useState(JSON.parse(localStorage.user));
    const user = JSON.parse(localStorage.user);
    const [refreshButton, setRefreshButton] = React.useState(false); 
    const [follows, setFollow] = React.useState(false);

    const config ={
        headers:{
            Authorization: `Bearer ${user.data.token}` 
        }
    }

    React.useEffect(() => {

        const promise = axios.get(`${url}/follow/${followedId}`, config);
        promise.then((res) => {
            console.log(res.data);
            setFollow(res.data.relation);
        });
        promise.catch((error) => {
            console.log(error);
        });

    }, []);

    function toggleFollow() {
        const followData = {
            follows: follows,
            userId: user.data.id,
            followedId: followedId
        }

        const promise = axios.post(`${url}/follow`, followData, config);
        promise.then((res) => {
            console.log(res.data);
            //setRefreshButton(true);
        })
    }

    if(refreshButton){
        const button = axios.get(`${url}/follow`, config);
        button.then((res) => {
            console.log(res.data);
            setFollow(res.data);
            setRefreshButton(false);
        });
        button.catch((error) => {
            console.log(error);
            setRefreshButton(false);
        });
    }

    return(
        <Button follows={follows} Onclick={toggleFollow}>
            { follows ? <h3>Unfollow</h3> : <h3>Follow</h3> }
        </Button>
    );
}


function buttonColor(follows) {
    if (follows) return '#FFFFFF';
    else return '#1877F2';
}

function fontColor(follows) {
    if (!follows) return '#FFFFFF';
    else return '#1877F2';
}

const Button = styled.div`
    width: 112px;
    height: 31px;
    background-color: ${({ follows }) =>
    buttonColor(follows)};
    display: flex;
    justify-content: center;
    align-items: center;

    h3{
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        color: ${({ follows }) =>
        fontColor(follows)};
    }
`