import styled from 'styled-components';

import Stars from '../../assets/stars.jpeg';

export const AppContainer = styled.div`
    .headerContainer { 
        background: url(${Stars});
        background-size: cover;
    }

    .bg-dark { background-color: rgba(33, 37, 41, .5) !important; }

    .logoContainer { justify-content: flex-start; }

    .loginContainer { 
        justify-content: flex-end;
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
    }

    .menuContainer { justify-content: center; }
`;

export const Logo = styled.img`
    filter: invert();
`;