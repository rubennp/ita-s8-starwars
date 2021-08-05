import styled from 'styled-components';

import Bg from '../../../assets/stormtroppers.jpg';

const Error404 = () => {
    return (
    <Container>
        <h1>404</h1>
        <div>
            <h2>Ups... this is not the page you're looking for!</h2>
            <p>Basically because doesn't exist. Go to the main menu to moving on.</p>
        </div>
    </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100wh;
    height: 80vh;
    padding: 2em 1em;
    background-image: url(${Bg});
    background-size: cover;
    background-position: center center;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .75);
    filter: opacity(.75);
    box-shadow: inset 0 0 100px black;

    h1, h2 { text-shadow: 0 0 10px white; }

    h1 { font-size: 10em; }

    h2 { font-size: calc(2.75vw + .25vh); }

    div > * { 
        font-weight: bold;
        text-shadow: 0 0 2px white;
        color: #ecd900;
        text-align: center; 
    }
`;

export default Error404;