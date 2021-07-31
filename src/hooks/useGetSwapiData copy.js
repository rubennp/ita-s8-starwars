import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const initState = 
{   
    count: 0,
    next: null,
    results: [{}],
    pageNumber: 1,
};

const reducer = (state, action)  => {
    switch(action) {
        case 'INIT':
            const { initData } = action.payload;
            console.log(initData);
            return ({
                ...state,
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
    const [results, setResults] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [state, dispatch] = useReducer(reducer, initState);
    const [pageNumber, setPageNumber] = useState(state.pageNumber);

    console.log(state);

    useEffect(() => {
        const getData = async ()=> {
            setIsLoading(true);
            setError(false);

            let cancel;
            await axios({
                method: 'GET',
                url: `https://swapi.dev/api/${from}`,
                params: { page: 1 },
                cancelToken: new axios.CancelToken(c => cancel = c),
            }).then(res => res.data).then(d => {
                dispatch({type: 'INIT', payload: { initData: d }});
                setResults(state.results);
                setPageNumber(state.pageNumber);
                setHasMore(!!d.next);
                setIsLoading(false);
            }).catch(e => {
                if (axios.isCancel(e)) return;
                setError(true);
            });

            return () => cancel();
        };

        getData();
    
    }, []);

    useEffect(() => {
        const getData = async ()=> {
            setIsLoading(true);
            setError(false);

            let cancel;
            await axios({
                method: 'GET',
                url: `https://swapi.dev/api/${from}`,
                params: { page: state.pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c),
            }).then(res => res.data).then(d => {
                // setResults(prev => {
                //     return (pageNumber !== 1) ? 
                //     (
                //         { 
                //             count: d.count, 
                //             next: d.next, 
                //             [`${from}`]: [...new Set([...prev[`${from}`], ...d.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])], 
                //         }
                //     ) : 
                //     (
                //         { 
                //             count: d.count, 
                //             next: d.next, 
                //             [`${from}`]: [...new Set([...d.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])], 
                //         }
                //     );
                // });
                // if (state.pageNumber === 1) {
                //     console.log(d);
                //     dispatch({type: 'INIT', payload: { initData: d }});
                //     setResults(state.results);
                //     setPageNumber(state.pageNumber);
                // } else {
                    dispatch({type: 'ADD', payload: { addData: { data: d, pageNumber: pageNumber }}});
                    setResults(state.results);
                // }
                setHasMore(!!d.next);
                setIsLoading(false);
            }).catch(e => {
                if (axios.isCancel(e)) return;
                setError(true);
            });

            return () => cancel();
        };

        getData();
        console.log(state);

    }, [pageNumber]);
    
    return { isLoading, error, results, hasMore, pageNumber, setPageNumber };
};