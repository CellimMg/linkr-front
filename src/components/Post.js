import styled from 'styled-components';
import {AiOutlineHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Post(props){
    const dataPost = (props.postData);
    console.log(dataPost.link);
    
        return(
        <Container>
            <Left>
                <img src={dataPost.userImage} alt='profile'></img>
                <Icon> 
                    <AiOutlineHeart />
                </Icon>
            </Left>
            <Content>
                <Link to={`/user/${dataPost.userId}`}><h1>{dataPost.userName}</h1></Link>
                <div className='postDescription'>
                    <p>{dataPost.description}</p>
                </div>
                <a href={ dataPost.link} target="_blank">
                    <div className='linkBody'>
                        <div className='linkText'>
                            <h2>{dataPost.urlTitle}</h2>
                            <h5>{dataPost.urlDescription}</h5>
                            <h4>{dataPost.link}</h4>
                        </div>
                        <div className='linkImage'>
                            <img src={dataPost.urlImage}/>
                        </div>
                    </div>
                </a>
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
    margin-bottom: 15px;

    a{
        text-decoration: none;
    }
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
    
    .postDescription {
        height: 52px;
        margin-top: 7px;
    }

    p{
        font-size: 17px;
        color:#B7B7B7;
        line-height: 20px;
        font-weight: 400;
    }


    .linkBody {
        width: 503px;
        height: 155px;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        display: flex;
    }

    .linkText {
        width: 350px;
        padding: 20px 26px 23px 20px;
    }

    .linkImage > img {
        width: 151px;
        height: 153px;
        object-fit:cover;
        border-radius: 0px 12px 13px 0px;
    }

    .linkText > h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #CECECE;

        margin-bottom: 5px;
    }

    .linkText > h4 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        
        color: #CECECE;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .linkText > h5 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 10px;
        
        color: #9B9595;

        margin-bottom: 13px;

        overflow: hidden;
        text-overflow: ellipsis;
    }
`