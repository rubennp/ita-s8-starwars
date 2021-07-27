import { Fitxa, Header, DetailsGrid, Details, Detail, Image } from './Info.styled.js';

import { useParams } from 'react-router-dom';

import imgError from '../../../../assets/found-image-not-was.jpg';


const Info = ({starships}) => {
    const { idx } = useParams();
    const starship = {...starships[idx]};
    const swapiRef = starship.url.replaceAll(/[^\d]/g, '');

    return (
        <Fitxa>
            <Header>
                <h2>{starship.name}</h2>
                <h3>{starship.model}</h3>
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
                        src={`https://starwars-visualguide.com/assets/img/starships/${swapiRef}.jpg`}
                        onError={e => { 
                            e.target.src = `${imgError}`
                            e.target.width = "600"
                        }}
                        alt="nau"
                    />
                </Image>
            </DetailsGrid>
        </Fitxa>
    );
};

export default Info;