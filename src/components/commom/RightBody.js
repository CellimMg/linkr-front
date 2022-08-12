import styledComponents from "styled-components";


const RightBody = styledComponents.div`
    width: 40%;
    height: 100%;
    background-color: #333333; 
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    span{
        font-family: 'Lato', sans-serif;
        font-size 20px;
        color: white;
        text-decoration: underline;
    }

    span:hover{
        cursor: pointer;
    }

    @media screen and (max-width: 720px){
        height: 75%;
        width: 100%;
    }
`;

export default RightBody;