import styled from 'styled-components';
import {AiOutlineHeart} from 'react-icons/ai';

export default function Post(){
    return(
        <Container>
            <Left>
                <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
                <Icon> 
                    <AiOutlineHeart />
                </Icon>
            </Left>
            <Content>
                <h1>Luis</h1>
                <p>Test teste teste</p>
            </Content>
                
        </Container>
    )
}

const Container = styled.div`
    width: 610px;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    padding: 15px;
    display: flex;
    @media (max-width: 610px){
        width: 100%;
    }
`
const Left = styled.div`
    width: 60px;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: 18px;
    
img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 20px;
}
`
const Icon = styled.div`
    color: #fff;
    font-size: 30px;
    
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    font-family: 'Lato';
    h1{
        font-size:20px;
        color:#fff;
        line-height: 23px;
        font-weight: 400;
    }
    p{
        font-size: 17px;
        color:#B7B7B7;
        line-height: 20px;
        font-weight: 400;
    }
`