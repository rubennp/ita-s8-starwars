import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Fitxa, Header, DetailsGrid, Details, Detail, Image, Navigation } from './Info.styled.js';

import imgError from '../../../../assets/found-image-not-was.jpg';

// if www.swapi.tech:
const getData = async url => {
    return await axios({
        method: 'GET',
        url: url,
    }).then(res => res.data.result.properties);
};
// end www.swapi.tech

const Info = ({history, starships, total}) => {
    const { idx } = useParams();
    const [backs, setBacks] = useState(1);
    
    useEffect(() => { 
        setBacks(1); 
    }, []);

    // swapi.dev:
    // const [starship, setStarship] = useState({...starships[idx]});

    // useEffect(() => { 
    //     setStarship({...starships[idx]});
    // }, [starships, idx]);
    // end swapi.dev

    // www.swapi.tech:
    const [infoUrl, setInfoUrl] = useState(starships[idx].url);
    const [starship, setStarship] = useState({});

    useEffect(() => {
        getData(infoUrl).then(props => setStarship({...props}));
    }, [infoUrl]);

    useEffect(() => {
        setInfoUrl(starships[idx.url]);
    }, [starships, idx]);
    // end www.swapi.tech

    return (
        <Fitxa>
            <Header>
                <div>
                    <h2>{starship.name}</h2>
                    <h3>{starship.model}</h3>
                </div>
                <Navigation>
                    <div>
                        <button type="button" onClick={() => {
                            setBacks(prev => prev + 1);
                            history.push(`/starships/0`)
                        }} >⇤</button>
                        <button type="button" onClick={() => {
                            setBacks(prev => prev + 1);
                            history.push(`/starships/${idx > 0 ? parseInt(idx) - 1 : starships.length - 1}`)
                        }} >←</button>
                        <button className="return" type="button" onClick={() => history.go(-(backs))} >△</button>
                        <button type="button" onClick={() => {
                            setBacks(prev => prev + 1);
                            history.push(`/starships/${idx < starships.length - 1 ? parseInt(idx) + 1 : 0 }`)
                        }} >→</button>
                        <button type="button" onClick={() => {
                            setBacks(prev => prev + 1);
                            history.push(`/starships/${starships.length - 1}`)
                        }} >⇥</button>
                    </div>
                    <p>{`loaded ${starships.length} of ${total}`}</p>

                </Navigation>
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
        </Fitxa>
    );
};

export default Info;