import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

import Stars from './img/stars.jpeg';

export const HeaderContainer = styled(Container)`
    background: url(${Stars});
    background-size: cover;
`;

export const HeaderMainNav = styled(Row)`
    border-top: 1px solid rgba(255, 255, 255, .5);
    border-bottom: 1px solid rgba(255, 255, 255, .5);

    & > nav {
        padding-top: 0;
        padding-bottom: 0;
    }

    ul li {
        border-right: 1px solid rgba(255, 255, 255, .5);

        &:first-of-type { border-left: 1px solid rgba(255, 255, 255, .5); }

        & a { 
            text-transform: uppercase;

            &.active {
                text-shadow: 1px 1px 5px white;
                border-bottom: 5px solid #0066ff; 
            }
        }
    }
`;

export const LogoContainer = styled(Container)`
    justify-content: flex-start !important;
`;

export const SignContainer = styled(Container)`
    justify-content: flex-end !important;
    margin-bottom: 0;

    li {
        display: flex;
        align-content: center;
        color: white;
    }

    button {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        color: rgba(255, 255, 255, .5);
        text-transform: uppercase;

        &:hover {
            transform: scale(1.1, 1.1);
            color: white;

            img { filter: invert() opacity(1); }
        }

        img {
            display: block;
            filter: invert() opacity(.5);
            margin-left: .5em;
        }
    }
`;

export const MenuContainer = styled(Container)`
    justify-content: center !important;
`;

export const Logo = styled.img`
    filter: invert();
`;