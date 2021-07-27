import styled from 'styled-components';

// Components
import Item from './Item';

const List = ({starships}) => {
    return (
        <Ul>
            {starships.map((starship, idx) => 
                <a href={`/starships/${idx}`} key={idx}>
                    <Item starship={starship}></Item>
                </a> 
            )}
        </Ul>
    );
};

const Ul = styled.ul`
    a { 
        text-decoration: none;

        &:hover li {
            color: white;
        }
    }
    list-style-type: none;
`;

export default List;