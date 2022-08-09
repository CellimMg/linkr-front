import styled from 'styled-components'
import Post from './Post'

export default function UserPage(){

    return (
        <Container>
            <Head>
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
                <h1>Luis Henrique posts</h1>
            </Head>
            <Post></Post>
           
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

`
const Head = styled.div` 
    width: 610px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 40px;
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size:45px;
        color:#fff;
    }
    img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 15px;
}
@media(max-width:610px) {
    width: 100%;
}
`