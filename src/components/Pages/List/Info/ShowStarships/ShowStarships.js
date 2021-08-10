import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { PilotsFilmsAndStarships as Starships } from '../Info.styled';

import imgError from '../img/found-image-not-was.jpg';

const getSwapiRef = url => url.replaceAll(/[^\d]/g, '');

const initStarshipsInfo = null;

const stateStarshipsInfo = (starships, { type, payload: { starship, total } }) => {
    switch(type) {
        case 'ADD':
            return !starships ?
            [{ name: starship.name, swapiRef: starship.swapiRef }] :
            starships.length < total ? [...starships, { name: starship.name, swapiRef: starship.swapiRef}] : starships;
        case 'INIT':
            return initStarshipsInfo;
        default:
            return starships;
    }
};

const ShowStarships = ({starships}) => {
    const [starshipsInfo, dispatchStarshipsInfo] = useReducer(stateStarshipsInfo, initStarshipsInfo);

    useEffect(function getStarshipsInfo() {
        dispatchStarshipsInfo({type: 'INIT', payload: { starship: "", total: 0 }});

        const getStarshipsInfo = async url => {
            await axios.get(url).then(res => res.data).then(data => {
                dispatchStarshipsInfo({
                    type: 'ADD', 
                    payload: { 
                        starship: { 
                            name: data.name, swapiRef: getSwapiRef(data.url) 
                        }, 
                        total: starships.length 
                    } 
                });
            });
        };

        starships.forEach(url => {
            getStarshipsInfo(url);
        });
    }, [starships]);

    return (
        <Starships>
            <h2>Starships:</h2>
            <ul>
                { starshipsInfo && starshipsInfo.map((starship, idx) => {
                    return (
                        <li key={`${idx}${starship.swapiRef}`}> {/*onClick={() => { history.push(`/starships/${starship.swapiRef}`); }}*/}
                            <div>
                                <img key={idx} src={`https://starwars-visualguide.com/assets/img/starships/${starship.swapiRef}.jpg`} 
                                     onError={e => { 
                                        e.target.src = `${imgError}`
                                     }}
                                     alt="nau" />
                                <p><span>{starship.name}</span></p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Starships>
    );
};

export default ShowStarships;