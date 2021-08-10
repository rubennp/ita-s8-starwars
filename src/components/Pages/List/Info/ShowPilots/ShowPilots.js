import { useEffect, useReducer } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { PilotsFilmsAndStarships as Pilots } from '../Info.styled';


const getSwapiRef = url => url.replaceAll(/[^\d]/g, '');

const initPilotsInfo = null;

const statePilotsInfo = (pilots, { type, payload: { pilot, total } }) => {
    switch(type) {
        case 'ADD':
            return !pilots ?
            [{ name: pilot.name, swapiRef: pilot.swapiRef }] :
            pilots.length < total ? [...pilots, { name: pilot.name, swapiRef: pilot.swapiRef}] : pilots;
        case 'INIT':
            return initPilotsInfo;
        default:
            return pilots;
    }
};

const ShowPilots = ({pilots}) => {
    // const history = useHistory();
    const [pilotsInfo, dispatchPilotsInfo] = useReducer(statePilotsInfo, initPilotsInfo);

    useEffect(function getPilotsInfo() {
        dispatchPilotsInfo({type: 'INIT', payload: { pilot: "", total: 0 }});
        const getPilotsInfo = async url => {
            await axios.get(url).then(res => res.data).then(data => {
                dispatchPilotsInfo({
                    type: 'ADD', 
                    payload: { 
                        pilot: { 
                            name: data.name, swapiRef: getSwapiRef(data.url) 
                        }, 
                        total: pilots.length 
                    } 
                });
            });
        };

        pilots.forEach(url => {
            getPilotsInfo(url);
        });
    }, [pilots]);

    return (
        <Pilots>
            <h2>Pilots:</h2>
            <ul>
                { pilotsInfo && pilotsInfo.map((pilot, idx) => {
                    return (
                        <li key={`${idx}${pilot.swapiRef}`}> {/*onClick={() => { history.push(`/people/${pilot.swapiRef}`); }}*/}
                            <div>
                                <img key={idx} src={`https://starwars-visualguide.com/assets/img/characters/${pilot.swapiRef}.jpg`} alt="pilot" />
                                <p>{pilot.name}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Pilots>
    );
};

export default ShowPilots;