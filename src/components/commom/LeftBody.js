import styledComponents from "styled-components";


const LeftBody = styledComponents.div`
    padding-left: 100px;
    padding-bottom: 200px;
    width: 60%;
    height: 100%;
    display: flex;    
    flex-flow: column;
    justify-content: center;

    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;

    div:nth-child(1) span{
        font-family: 'Passion One', cursive;
        font-weight: 700;
        font-size: 106px;
    }

    @media screen and (max-width: 720px){
        height: 25%;
        width: 100%;
        padding: 0px;
        align-items: center;

        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 23px;

        div:nth-child(1) span{
            font-family: 'Passion One', cursive;
            font-weight: 700;
            font-size: 76px;
        }
    }
`;

export default LeftBody;