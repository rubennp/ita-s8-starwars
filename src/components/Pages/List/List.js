import { useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

// components
import Item from './Item';

const List = ({list, what, data: {isLoading, hasMore, setPage} }) => {
    const history = useHistory();
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
        <Items>
            {list.map((item, idx) => {
                const isLastEl = list.length === idx + 1;

                return (
                    <button type="button" key={idx} ref={isLastEl ? lastEl : null } onClick={() => {
                        // history.push(`/${what}/${item.swapiRef}`);
                        history.push(`/${what}/${idx}`);
                    }}>
                        <Item item={item} what={what}></Item>
                    </button>
                ); 
            }
            )}
        </Items>
    );
};

const Items = styled.ul`
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

export default List;