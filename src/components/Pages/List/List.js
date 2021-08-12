import { useRef, useCallback } from 'react';
import { useHistory } from 'react-router';

// styled components
import { Items } from './List.styled';

// components
import Item from './Item';
import InfoHasMore from './InfoHasMore';

const List = ({list, what, data: {isLoading, hasMore, setPage}}) => {
    const history = useHistory();
    const observer = useRef();
    

    const lastEl = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
        });
        if (node) observer.current.observe(node);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, hasMore]);

    return (
        <>
            <InfoHasMore hasMore={hasMore} what={what} />
            
            <Items>
                {list.map((item, idx) => {
                    const isLastEl = list.length === idx + 1;

                    return (
                        <button type="button" key={idx} ref={isLastEl ? lastEl : null } onClick={() => {
                            history.push(`/${what}/${item.swapiRef}`);
                        }}>
                            <Item item={item} what={what}></Item>
                        </button>
                    ); 
                }
                )}
            </Items>
        </>
    );
};

export default List;