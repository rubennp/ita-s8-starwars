import { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import List from './List';

const StarShips = () => {
    const [starships, setStarships] = useState([]);

    useEffect(() => {
        const getData = async () => { 
            const results = await axios(
                'https://swapi.dev/api/starships',
            );

            setStarships(results.data.results);
        };
        getData();
    }, []);

    return (<List starships={starships} />);
};

export default StarShips;