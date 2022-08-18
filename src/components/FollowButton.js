import React from "react";
import axios from 'axios';
import styled from "styled-components";
import url from '../repositories/server.js';

export default function FollowButton( { followedId } ) {
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

    }, [refreshButton]);

    function toggleFollow() {
        console.log('testando toggle');
        const followData = {
            follows: follows,
            userId: user.data.id,
            followedId
        }

        const promise = axios.post(`${url}/follow`, followData, config);
        promise.then((res) => {
            console.log(res.data);
            setRefreshButton(!refreshButton);
        }) 
        promise.catch((error) => {
            console.log(error);
        });
    }


    return(
        <Button follows={follows} onClick={() => toggleFollow()}>
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
    border-radius: 5px;

    h3{
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        color: ${({ follows }) =>
        fontColor(follows)};
    }
`