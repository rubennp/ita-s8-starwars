import styled from 'styled-components';

import Item from './Item';

const List = ({starships}) => {
    return (
        <Ul>
            {starships.map((starship, idx) => <Item starship={starship} key={idx} />)}
        </Ul>
    );
};

const Ul = styled.ul`
    list-style-type: none;
`;

export default List;