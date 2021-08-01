import { useRef, useCallback } from 'react';
import styled from 'styled-components';

// components
import Item from './Item';

const StarShips = ({history, starships, data: {isLoading, hasMore, setPage} }) => {
    const observer = useRef();
    const lastEl = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, hasMore]);

    return (
        <Ul id="starships-list">
            {starships.map((starship, idx) => {
                const isLastEl = starships.length === idx + 1;

                return (
                    <button type="button" key={idx} ref={isLastEl ? lastEl : null } onClick={() => { 
                        history.push(`/starships/${idx}`);
                    }}>
                        <Item starship={starship}></Item>
                    </button>
                ); 
            }
            )}
        </Ul>
    );
};

const Ul = styled.ul`
    button {
        display: list-item;
        width: 100%;
        border: none;
        padding: 0;
        margin: 20px 10px;
        &:hover li { color: white; }
    }

    list-style-type: none;
`;

export default StarShips;