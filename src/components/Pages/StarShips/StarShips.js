import { useRef, useCallback } from 'react';
import styled from 'styled-components';

// components
import Item from './Item';

const StarShips = ({starships, data: {isLoading, hasMore, setPage} }) => {
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

                return isLastEl ? (
                    <a href={`/starships/${idx}`} key={idx} ref={lastEl}>
                        <Item starship={starship}></Item>
                    </a>
                ) : (
                    <a href={`/starships/${idx}`} key={idx}>
                        <Item starship={starship}></Item>
                    </a>
                )
            }
            )}
        </Ul>
    );
};

const Ul = styled.ul`
    a { 
        text-decoration: none;

        &:hover li { color: white; }
    }

    list-style-type: none;
`;

export default StarShips;