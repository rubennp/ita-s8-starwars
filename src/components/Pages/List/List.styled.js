import styled from 'styled-components';

export const Items = styled.ul`
    button {
        display: list-item;
        width: 100%;
        border: none;
        padding: 0;
        margin: 20px 10px;
        &:hover li { color: white; }
    }

    list-style-type: none;
`;