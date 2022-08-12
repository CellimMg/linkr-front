import styledComponents from "styled-components";


const Body = styledComponents.div`
    width: 100%;
    height: 100%;
    background-color: #151515;
    display: flex;

    @media screen and (max-width: 720px){ 
        flex-flow: column;
    }
    
`;


export default Body;