import styled from "styled-components";
import Post from "./Post";
import Publication from "./Publication";

export default function Timeline() {

    return (
        <>
            <Container>
                <h1>Timeline</h1>
            </Container>
        </>
    )
}

const Container = styled.div`
    background-color: #333333;
    width: 100%;
    height: 100vh;
    padding-top: 150px;

    h1 {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;

        margin-bottom: 64px;
    }
`