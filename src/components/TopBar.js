import styled from 'styled-components';

export default function TopBar(){
    return(
        <Top>
            <h1>linkr</h1>
            
                <input
                 placeholder='Search for people'
                 />
                
            
            <img src='https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png'></img>
        </Top>
    )
}

const Top = styled.div`
height: 70px;
background-color: #151515;
display: flex;
align-items: center;
padding:0px 30px 0px;
justify-content: space-between;

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
    min-width:560px;
    background: #FFFFFF;
    border-radius: 8px;
    height: 45px;
    border:none;
    }

` 
