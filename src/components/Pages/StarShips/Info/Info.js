import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import stars from '../../../../assets/stars.jpeg';

const Info = ({starships}) => {
    const { idx } = useParams();
    const starship = {...starships[idx]};
    // const swapiRef = starship.url.replaceAll(/[^\d]/g, '');
    // console.log(swapiRef);

    return (
        <Fitxa>
            <dt>
                <h2>{starship.name}</h2>
                <h3>{starship.model}</h3>
            </dt>
            <div>
                <div>
                    <dt>Manufacturer:</dt>
                    <dd>{starship.manufacturer}</dd>
                </div>
                <div>
                    <dt>Cost in credits:</dt>
                    <dd>{starship.cost_in_credits}</dd>
                </div>
                <div>
                    <dt>Lenght:</dt>
                    <dd>{starship.length}</dd>
                </div>
                <div>
                    <dt>Max atmosphering Speed:</dt>
                    <dd>{starship.max_atmosphering_speed}</dd>
                </div>
                <div>
                    <dt>Crew:</dt>
                    <dd>{starship.crew}</dd>
                </div>
                <div>
                    <dt>Passengers:</dt>
                    <dd>{starship.passengers}</dd>
                </div>
                <div>
                    <dt>Cargo Capacity:</dt>
                    <dd>{starship.cargo_capacity}</dd>
                </div>
                <div>
                    <dt>Consumables:</dt>
                    <dd>{starship.consumables}</dd>
                </div>
                <div>
                    <dt>Hyperdrive Rating:</dt>
                    <dd>{starship.hyperdrive_rating}</dd>
                </div>
                <div>
                    <dt>MGLT:</dt>
                    <dd>{starship.MGLT}</dd>
                </div>
                <div>
                    <dt>Class:</dt>
                    <dd>{starship.starship_class}</dd>
                </div>
            </div>
        </Fitxa>
    );
};

const Fitxa = styled.dl`
    margin-top: 2em;
    h2 { text-transform: uppercase; }
    h3 { 
        font-size: 1.5em; 
        font-style: oblique;
    }
    & > dt {
        padding: 1em; 
        background-color: #212529;
        color: rgba(255, 255, 255, 0.75);
    }
    & > div {
        color: white;
        margin-top: 0.5em;
        padding: 1em;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-image: url(${stars});
        background-size: cover;
        opacity: .5;
    }
    & > div > div {
        display: flex;
        justify-content: space-between;
    }
`;

export default Info;