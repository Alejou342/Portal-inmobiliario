/* 
    Hook que maneja las peticiones GET de una manera generalizada: 
        * data: Es una variable que almacena la información de la respuesta de la solicitud HTTP cuando es CORRECTA
        * error: Es una variable que almacena la información de la respuesta de la solicitud HTTP cuando es INCORRECTA
        * loading: Es una variable que retorna true mientras se completa la petición HTTP y retorna false cuando finaliza
        * sessionInfo: Es una variable que almacena la información de la Cookie 'SessionInfo' y utiliza la propiedad token 
        * necesaria para las solicitudes
*/

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