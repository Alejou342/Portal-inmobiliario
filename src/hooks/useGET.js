import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

    const useGET = (url) => {
        const [data, setData] = React.useState(null);
        const [error, setError] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'));

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
            } catch (error) {
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