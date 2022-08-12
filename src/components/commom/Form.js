import styledComponents from "styled-components";


const Form = styledComponents.form`
    width: 100%;
    margin-bottom: 25px;
    padding: 0px 23px;

    input, button{
        font-family: 'Oswald', sans-serif;
        color: #9F9F9F;
        font-size: 22px;
        width: 100%;
        height: 55px;
        background-color: white;
        border-radius: 6px;
        margin-top: 10px;
        border: none;
        padding-left: 17px;
    }

    input::placeholder{
        font-family: 'Oswald', sans-serif;
        color: #9F9F9F;
        font-size: 22px;
    }

    button{
        background-color: ${props => props.loading ? "#A2C7F7" : "#1877F2"};
        color: white;
    }

    button:hover{
        cursor: pointer;
    }
`;


export default Form;