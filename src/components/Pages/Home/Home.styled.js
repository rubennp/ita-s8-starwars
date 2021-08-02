import { Container, Col } from 'react-bootstrap';

import styled from 'styled-components';

export const Strong = styled.span`
    display: inline-block;
    border-bottom: 0.25em solid rgba(0, 102, 255, .25);
    filter: drop-shadow(2px 2px 2px rgba(0, 102, 255, .75));
    line-height: .55;
`;
export const StyledContainer = styled(Container)`
    display: flex;
    height: 75vh;
`;

export const Hero = styled(Col)`
    align-self: center;
    text-transform: uppercase;
    background-color: white;
    box-shadow: 0 0 20px white;

    img {
        box-shadow: 5px 5px 25px rgba(0, 0, 0, .25)
    }

    button {
        background-color: rgba(0, 0, 255, .5);
        filter: drop-shadow(2px 2px 2px rgba(0,0, 255, .75));
    }

    p:last-of-type { text-align: center; }
`;
