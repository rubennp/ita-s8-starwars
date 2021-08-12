import styled from 'styled-components';

export const Nav = styled.div`
    button {
        margin-top: 1em;
        border: unset;
        background-color: rgba(0, 0, 0, 0);
        color: rgba(255, 255, 255, 0.5);

        &:hover {
            color: white;
            transform: scale(1.25);
        }
    }

    p { 
        color: rgba(255, 255, 255, 0.25);
        font-style: oblique;
        text-transform: uppercase;
        text-align: center;
        font-size: .6em;
    }
`;