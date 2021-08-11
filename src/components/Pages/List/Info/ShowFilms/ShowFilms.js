import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { PilotsFilmsAndStarships as Films } from '../Info.styled';

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
                            <div>
                                <img key={idx} src={`https://starwars-visualguide.com/assets/img/films/${film.swapiRef}.jpg`} alt="film" />
                                <p className="film">Episode {romanEpisode[film.episode]}:<br/><span>{film.title}</span></p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Films>
    );
};

export default ShowFilms;