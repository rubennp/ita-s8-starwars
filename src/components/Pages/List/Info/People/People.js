import { useEffect, useState, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Fitxa, Header, DetailsGrid, Details, Detail, Image } from '../Info.styled';

import Navigation from '../Navigation';
import ShowStarships from '../ShowStarships';
import ShowFilms from '../ShowFilms';

import imgError from '../img/found-image-not-was.jpg';

const getSwapiRef = url => url.replaceAll(/[^\d]/g, '');

const initCharacter = {
    name: null,
    swapiRef: null,
    specie: null,
    language: null,
    planet: null,
    height: null,
    mass: null,
    hair_color: null,
    skin_color: null,
    eye_color: null,
    birth_year: null,
    gender: null,
    films: [],
    starships: [],
};

const stateCharacter = (character, {type, payload }) => {
    switch(type) {
        case 'INIT':
            return initCharacter;
        case 'CHANGE':
            return { ...character, ...payload };
        default:
            return character;
    }
};

const People = ({people, total }) => {

    /* 
    || TODO: !!
    ||
    || pensar si passo sWapiRef en comptes d'índex...
    */

    const {idx} = useParams();
    // const {ref} = useParams();

    const history = useHistory();
    const [backs, setBacks] = useState(1);
    const [character, dispatchCharacter] = useReducer(stateCharacter, initCharacter);

    useEffect(() => {
        setBacks(1); 
    }, []);

    useEffect(function getCharacterInfo() {
        const ch = people[idx];
        // const ch = people.filter(el => el.swapiRef === ref);

        const getSpecie = async () => {
            await axios.get(ch.species[0]).then(res => res.data).then(data => {
                dispatchCharacter({type: 'CHANGE', payload: { specie: data.name } });
            });
        };

        const getLanguage = async () => {
            await axios.get(ch.species[0]).then(res => res.data).then(data => {
                dispatchCharacter({ type: 'CHANGE', payload: { language: data.language } });       
            });
        };

        const getPlanet = async () => {
            await axios.get(ch.homeworld).then(res => res.data).then(data => {
                dispatchCharacter({ type: 'CHANGE', payload: { planet: data.name } });
            });
        };
        
        if (!ch) 
            history.push('/people');
        else {
            if (ch.species[0]) {
                getSpecie();
                getLanguage();
            }
    
            if (ch.homeworld) getPlanet(ch);
            
            dispatchCharacter({type: 'INIT', payload: ""});

            dispatchCharacter({type: 'CHANGE', payload: {
                name:ch.name,
                swapiRef: getSwapiRef(ch.url),
                height: ch.height,
                mass: ch.mass,
                hair_color: ch.hair_color,
                skin_color: ch.skin_color,
                eye_color: ch.eye_color,
                birth_year: ch.birth_year,
                gender: ch.gender,
                films: ch.films,
                starships: ch.starships,
            }});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [people, idx]);

    return (
        character &&
        <Fitxa>
            <Header>
                <div>
                    <h2>{character.name}</h2>
                    {character.specie && <h3>{character.specie}</h3>} 
                </div>
                <Navigation 
                    idx={idx} 
                    list={people} 
                    what="people" 
                    backs={backs} 
                    setBacks={setBacks} 
                    history={history} 
                    total={total} />
            </Header>
            <DetailsGrid>
                <Details>
                    {character.planet &&  
                        <Detail>
                            <dt>From:</dt>
                            <dd>{character.planet}</dd>
                        </Detail>
                    }  
                    {character.language &&
                        <Detail>
                            <dt>Language:</dt>
                            <dd>{character.language}</dd>
                        </Detail> 
                    }
                    <Detail>
                        <dt>Height:</dt>
                        <dd>{character.height}</dd>
                    </Detail>
                    <Detail>
                        <dt>Mass:</dt>
                        <dd>{character.mass}</dd>
                    </Detail>
                    <Detail>
                        <dt>Hair color:</dt>
                        <dd>{character.hair_color}</dd>
                    </Detail>
                    <Detail>
                        <dt>Skin color:</dt>
                        <dd>{character.skin_color}</dd>
                    </Detail>
                    <Detail>
                        <dt>Eye color:</dt>
                        <dd>{character.eye_color}</dd>
                    </Detail>
                    <Detail>
                        <dt>Birth date:</dt>
                        <dd>{character.birth_year}</dd>
                    </Detail>
                    <Detail>
                        <dt>Gender:</dt>
                        <dd>{character.gender}</dd>
                    </Detail>
                </Details>
                <Image>
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/characters/${character.swapiRef}.jpg`}
                        onError={e => { 
                            e.target.src = `${imgError}`
                            e.target.height = "550"
                        }}
                        alt="nau"
                        height="350"
                    />
                </Image>
            </DetailsGrid>
            { character.starships.length > 0 && <ShowStarships starships={character.starships} /> }
            { character.films.length > 0 && <ShowFilms films={character.films} /> }
        </Fitxa>
    );
};

export default People;