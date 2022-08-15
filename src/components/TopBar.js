import styled from 'styled-components';
import React, { useEffect, useState, useRef, useContext } from 'react';
import SearchBar from './SearchBar';
import UserContext from '../context/userContext.js';
import arrowImage from "../assets/arrow-menu.svg"
import { useNavigate } from 'react-router-dom';

export default function TopBar() {

    const user = JSON.parse(localStorage.user);
    const [open, setOpen] = useState(false);
    const { setUser } = useContext(UserContext);
    const imageMenu = useRef();
    const arrowMenu = useRef();
    const signoutText = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (event.target != imageMenu.current && event.target != arrowMenu.current && event.target != signoutText.current) {
                setOpen(false);
            }
        });
    }, []);

    function handleMenu() {
        setOpen(!open);
    }

    function onTapSignout() {
        setUser({});
        localStorage.clear();
        navigate("/");
    }

    return (
        <Top rotate={open}>
            <Main>
                <h1>linkr</h1>
                <SearchBar />
                <UserMenu>
                    <img className={open ? "open" : ""} ref={arrowMenu} onClick={() => handleMenu()} src={arrowImage} alt='arrow' />
                    <img ref={imageMenu} onClick={() => handleMenu()} src={user.data.picture_url} alt='profile'/>
                </UserMenu>
            </Main>
            <div className={open ? "menu open" : "menu"}><span ref={signoutText} onClick={() => onTapSignout()}>Logout</span></div>
        </Top>
    )
}

const Top = styled.div`
    width: 100vw;
    height: 70px;
    display: flex;
    background-color: #151515;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    position: fixed;
    left: 0;
    top: 0;

    .menu{
        z-index: -1;
        border-bottom-left-radius: 20px;
        position: absolute;
        top: calc(100% - 54px);
        right: 0%;
        width: 150px;
        height: 50px;
        transition: top 0.5s, height 0.5s, z-index 0.1s;
        background-color: #151515;
        color: white;
        text-align: middle;
        padding-top: 10px;
        padding-left: 30px;

        span:hover{
            cursor: pointer;
        }
    }

    .open{
        height: 50px;
        top: 100%;
        z-index: 5;
    }

    h1{
        font-family: 'Passion One';
        color:#fff;
        font-size: 49px;
        font-weight: 700;
    }

    img:nth-child(1){
        margin: 0px 15px 10px 0px;
        width: 30px;
        height: 30px;
        transition: rotateX 0.5s;
        transform: ${props => props.rotate ? "rotateX(180deg)" : "rotateX(0deg)"};
    }


    img:nth-child(2){
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
    padding:10px 30px 0px;
    justify-content: space-between;
    background-color: #151515;
    height: 75px;
    
    @media (max-width: 650px) {
       margin-bottom: 20px;
    }

`

const UserMenu = styled.div`
    img:hover{
        cursor: pointer;
    }
`;