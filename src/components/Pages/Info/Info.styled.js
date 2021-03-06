import styled from 'styled-components';

import stars from '../../App/img/stars.jpeg';

export const PilotsFilmsAndStarships = styled.div`
    margin-top: 1em;

    h2 {
        color: rgba(255, 255, 255, .75);
    }

    ul {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        li {
            list-style-type: none;
            width: 25%;

            &:hover p { opacity: 1; }

            img { 
                width: 100%;
                padding: 10px;
                transition: filter .5s;
            }

            div {
                position: relative;

                &.starship:hover, &.pilot:hover {
                    cursor: pointer;

                    & img { filter: grayscale(75%); }
                }
            }

            p { 
                opacity: 0;
                position: absolute;
                width: 100%;
                bottom: 0;
                text-align: center;
                padding: 1em 0;
                margin: 0;
                color: white;
                font-size: 1.5em;
                text-transform: uppercase;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .5s;

                span { font-size: 0.6em; }
            }
        }
    }
`;

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
    column-gap: 1em;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5em;
    padding: 1em;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-image: url(${stars});
    background-size: cover;
`;

export const Details = styled.div`
    padding: 1em;
    filter: drop-shadow(0 0 50px white);
    backdrop-filter: brightness(.4) blur(1px) opacity(.75);
    border-radius: 5px;
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
    filter: drop-shadow(0 0 2px white);

    img { border-radius: 5px;}
`;

export const Fitxa = styled.dl`
    margin-top: 2em;
`;