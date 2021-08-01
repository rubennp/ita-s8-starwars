import styled from 'styled-components';

import stars from '../../../../assets/stars.jpeg';

export const Header = styled.dt`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em; 
    background-color: #212529;
    color: rgba(255, 255, 255, 0.75);

    h2 { text-transform: uppercase; }

    h3 { 
        font-size: 1.5em; 
        font-style: oblique;
    }
`;

export const Navigation = styled.div`
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

export const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5em;
    padding: 1em;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-image: url(${stars});
    background-size: cover;
`;

export const Details = styled.div`
    padding: 3em;
`;

export const Detail = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;

    & > dt { text-transform: uppercase; }

    & > dd { text-align: right; }
`;

export const Image = styled.div`
    display: flex;
    justify-content: center;
    filter: drop-shadow(1px 1px 5px red)
`;

export const Fitxa = styled.dl`
    margin-top: 2em;
`;