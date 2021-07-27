import styled from 'styled-components';

import stars from '../../../../assets/stars.jpeg';

export const Header = styled.dt`
    padding: 1em; 
    background-color: #212529;
    color: rgba(255, 255, 255, 0.75);

    h2 { text-transform: uppercase; }

    h3 { 
        font-size: 1.5em; 
        font-style: oblique;
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
    opacity: .5;
`;

export const Details = styled.div`
    padding: 3em;
`;

export const Detail = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;

    & > dt { text-transform: uppercase; }
`;

export const Image = styled.div`
    display: flex;
    justify-content: center;
`;

export const Fitxa = styled.dl`
    margin-top: 2em;
`;