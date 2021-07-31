import styled from 'styled-components';

import Stars from '../../assets/stars.jpeg';

export const AppContainer = styled.div`
    .headerContainer { 
        background: url(${Stars});
        background-size: cover;
    }

    .bg-dark { 
        background-color: rgba(33, 37, 41, .5) !important;
    }

    .logoContainer { justify-content: flex-start; }

    .loginContainer { justify-content: flex-end; }

    .menuContainer { justify-content: center; }
`;

export const Logo = styled.img`
    filter: invert();
`;