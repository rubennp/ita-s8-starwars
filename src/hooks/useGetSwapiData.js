import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const initState = 
{   
    count: 0,
    next: null,
    results: [],
    pageNumber: 0,
};

const reducer = (state, action)  => {
    switch(action.type) {
        case 'INIT':
            const { initData } = action.payload;
            return ({
                count: initData.count,
                next: initData.next,
                results: [...new Set([...initData.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])],
            });
        case 'ADD':
            const { addData } = action.payload;
            return ({
                count: addData.data.count,
                next: addData.data.next,
                results: [...new Set([...state.results, ...addData.data.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])],
                pageNumber: addData.pageNumber,
            });
        default:
            return state;
    }
};

export const useGetSwapiData = (from) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [state, dispatch] = useReducer(reducer, initState);
    const [pageNumber, setPageNumber] = useState(state.pageNumber);

    useEffect(() => {
        setPageNumber(1);
    }, []);

    useEffect(() => {
        setHasMore(!!state.next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.results]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            setError(false);

            let cancel;
            await axios({
                method: 'GET',
                url: `https://swapi.dev/api/${from}`,
                params: { page: pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c),
            }).then(res => res.data).then(d => {
                if (pageNumber === 1) {
                    dispatch({type: 'INIT', payload: { initData: d }});
                } else if (pageNumber > 1) {
                    dispatch({type: 'ADD', payload: { addData: { data: d, pageNumber: pageNumber }}});
                }
                setIsLoading(false);
            }).catch(e => {
                if (axios.isCancel(e)) return;
                setError(true);
            });

            return () => cancel();
        };

        getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);
    
    return { isLoading, error, state, hasMore, pageNumber, setPageNumber };
};