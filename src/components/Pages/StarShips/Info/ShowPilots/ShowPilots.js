import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
                        <li key={`${idx}${pilot.swapiRef}`}>
                            <img key={idx} src={`https://starwars-visualguide.com/assets/img/characters/${pilot.swapiRef}.jpg`} alt="pilot" />
                            <p>{pilot.name}</p>
                        </li>
                    );
                })}
            </ul>
        </Pilots>
    );
};

const Pilots = styled.div`
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
            }
        }
    }
`;


export default ShowPilots;