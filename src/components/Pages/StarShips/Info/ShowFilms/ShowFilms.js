import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const getSwapiRef = url => url.replaceAll(/[^\d]/g, '');
const romanEpisode = 
[
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
];

const initFilmsInfo = null;

const stateFilmsInfo = (films, { type, payload: { film, total } }) => {
    switch(type) {
        case 'ADD':
            return !films ?
            [{ episode: film.episode, title: film.title, swapiRef: film.swapiRef }] :
            films.length < total ? [...films, { episode: film.episode, title: film.title, swapiRef: film.swapiRef}] : films;
        case 'INIT':
            return initFilmsInfo;
        default:
            return films;
    }
};

const ShowFilms = ({films}) => {
    const [filmsInfo, dispatchFilmsInfo] = useReducer(stateFilmsInfo, initFilmsInfo);

    useEffect(function getFilmsInfo() {
        dispatchFilmsInfo({type: 'INIT', payload: { film: "", total: 0 }});
        const getFilmsInfo = async url => {
            await axios.get(url).then(res => res.data).then(data => {
                dispatchFilmsInfo({
                    type: 'ADD', 
                    payload: { 
                        film: { 
                            episode: data.episode_id, title: data.title, swapiRef: getSwapiRef(data.url) 
                        }, 
                        total: films.length 
                    } 
                });
            });
        };

        films.forEach(url => {
            getFilmsInfo(url);
        });
    }, [films]);

    return (
        <Films>
            <h2>Films:</h2>
            <ul>
                { filmsInfo && filmsInfo.sort((a, b) => {
                    return a.episode > b.episode ? 1 : -1;
                }).map((film, idx) => {
                    return (
                        <li key={`${idx}${film.swapiRef}`}>
                            <img key={idx} src={`https://starwars-visualguide.com/assets/img/films/${film.swapiRef}.jpg`} alt="film" />
                            <p>Episode {romanEpisode[film.episode]}:<br/>{film.title}</p>
                        </li>
                    );
                })}
            </ul>
        </Films>
    );
};

const Films = styled.div`
    margin-top: 1em;

    h2 {
        color: rgba(255, 255, 255, .75);
    }

    ul {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        position: relative;

        li {
            list-style-type: none;
            width: 25%;

            &:hover img {
                cursor: pointer;
                filter: grayscale(75%);
            }

            &:hover p { opacity: 1; }

            img { 
                width: 100%;
                padding: 10px;
                transition: filter .5s;
            }

            p { 
                opacity: 0;
                position: absolute;
                width: 25%;
                bottom: 0;
                text-align: center;
                padding: 1em 0;
                margin: 0;
                color: white;
                font-size: 1.5em;
                text-transform: uppercase;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .5s;

                & span { display: inline-block; }
            }
        }
    }
`;


export default ShowFilms;