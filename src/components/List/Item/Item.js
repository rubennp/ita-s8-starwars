import styled from 'styled-components';

const Item = ({item, what})  => {
    return (
        <Li>
            <h2>{item.name}</h2>
        </Li>
    );
};

const Li = styled.li`
    padding: 2em;
    background-color: #212529;
    color: rgba(255, 255, 255, .5);

    &:hover { cursor: pointer };

    h2 { 
        text-transform: uppercase; 
        font-size: 2em;
    }

    h3 { font-size: 1.5em; }
`;

export default Item;