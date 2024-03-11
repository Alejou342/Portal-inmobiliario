import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

    const useGET = (url: string) => {
        const [data, setData] = React.useState<any>([]);
        const [error, setError] = React.useState<any>(null);
        const [loading, setLoading] = React.useState<boolean>(true);
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}');

        React.useEffect(() => {
            const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${sessionInfo?.token}`
                    }
                });
                setData(response.data);
                setError(null);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
            };

            fetchData();
        }, []);
        return { data, loading, error };
    }

export default useGET;