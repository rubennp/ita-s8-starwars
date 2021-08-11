import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Fitxa, Header, DetailsGrid, Details, Detail, Image } from '../Info.styled';

import Navigation from '../Navigation';
import ShowPilots from '../ShowPilots';
import ShowFilms from '../ShowFilms';

import imgError from '../img/found-image-not-was.jpg';

const Starship = ({starships, total }) => {
    const history = useHistory();
    const {ref} = useParams();
    const starshipReferenced = starships.filter(el => el.swapiRef === ref)[0];

    const [backs, setBacks] = useState(1);
    
    useEffect(() => {
        setBacks(1); 
    }, []);

    const [starship, setStarship] = useState({...starshipReferenced});

    useEffect(function getStarshipInfo(){
        if (starshipReferenced)
            setStarship({...starshipReferenced});
        else history.push('/starships');
    }, [starships, ref]);

    return (
        <Fitxa>
            <Header>
                <div>
                    <h2>{starship.name}</h2>
                    <h3>{starship.model}</h3>
                </div>
                <Navigation 
                    idx={starship.idx} 
                    list={starships} 
                    what="starships" 
                    backs={backs} 
                    setBacks={setBacks} 
                    history={history} 
                    total={total} />
            </Header>
            <DetailsGrid>
                <Details>
                    <Detail>
                        <dt>Manufacturer:</dt>
                        <dd>{starship.manufacturer}</dd>
                    </Detail>
                    <Detail>
                        <dt>Cost in credits:</dt>
                        <dd>{starship.cost_in_credits}</dd>
                    </Detail>
                    <Detail>
                        <dt>Lenght:</dt>
                        <dd>{starship.length}</dd>
                    </Detail>
                    <Detail>
                        <dt>Max atmosphering Speed:</dt>
                        <dd>{starship.max_atmosphering_speed}</dd>
                    </Detail>
                    <Detail>
                        <dt>Crew:</dt>
                        <dd>{starship.crew}</dd>
                    </Detail>
                    <Detail>
                        <dt>Passengers:</dt>
                        <dd>{starship.passengers}</dd>
                    </Detail>
                    <Detail>
                        <dt>Cargo Capacity:</dt>
                        <dd>{starship.cargo_capacity}</dd>
                    </Detail>
                    <Detail>
                        <dt>Consumables:</dt>
                        <dd>{starship.consumables}</dd>
                    </Detail>
                    <Detail>
                        <dt>Hyperdrive Rating:</dt>
                        <dd>{starship.hyperdrive_rating}</dd>
                    </Detail>
                    <Detail>
                        <dt>MGLT:</dt>
                        <dd>{starship.MGLT}</dd>
                    </Detail>
                    <Detail>
                        <dt>Class:</dt>
                        <dd>{starship.starship_class}</dd>
                    </Detail>
                </Details>
                <Image>
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/starships/${starship.swapiRef}.jpg`}
                        onError={e => { 
                            e.target.src = `${imgError}`
                            e.target.width = "550"
                        }}
                        alt="nau"
                    />
                </Image>
            </DetailsGrid>
            { (starship.pilots && starship.pilots.length > 0) && <ShowPilots pilots={starship.pilots} /> }
            { (starship.films && starship.films.length > 0) && <ShowFilms films={starship.films} /> }
        </Fitxa>
    );
};

export default Starship;