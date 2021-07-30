import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGetSwapiData = (from) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const getData = async ()=> {
            setIsLoading(true);
            setError(false);

            let cancel;
            await axios({
                method: 'GET',
                url: `https://swapi.dev/api/${from}`,
                params: { page: pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c),
            }).then(res => res.data).then(d => {
                setResults(prev => {
                    return (pageNumber !== 1) ? 
                    (
                        { 
                            count: d.count, 
                            next: d.next, 
                            [`${from}`]: [...new Set([...prev[`${from}`], ...d.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])], 
                        }
                    ) : 
                    (
                        { 
                            count: d.count, 
                            next: d.next, 
                            [`${from}`]: [...new Set([...d.results.map(el => { return ({...el, swapiRef: el.url.replaceAll(/[^\d]/g, '')}); })])], 
                        }
                    );
                });
                setHasMore(!!d.next);
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
    
    return { isLoading, error, results, hasMore, pageNumber, setPageNumber };
};