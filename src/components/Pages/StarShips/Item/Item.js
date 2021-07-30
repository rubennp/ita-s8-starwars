import styled from 'styled-components';

const Item = ({starship})  => {
    return (
        <Li>
            <h2>{starship.name}</h2>
            <h3>{starship.model}</h3>
        </Li>
    );
};

const Li = styled.li`
    padding: 10px;
    margin: 20px 10px;
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