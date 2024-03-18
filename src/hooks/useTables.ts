/*
    Hook utilizado para mostrar correctamente las siguientes tablas: [Huella, Papelera, Leads Comerciales, Leads Residenciales]
        * param: Número utilizado para encontrar en wordKeys la información correcta para renderizar la información adecuada
        * wordKeys: Contiene palabras claves utilizadas para llevar a cabo las peticiones HTTP en las diferentes tables y según el rol
        * fetchDataResidencial: Función encargada de hacer GET según el rol del usuario en cuestión
        * availableStatus: Los estados disponibles que pueden tener los Leads en las tablas de Leads
        * id: Variable que almacena el número de identificador de una fila en la tabla en cuestión
        * page: Valor utilizado para manejar la paginación, ya que las propiedades solamente se muestran 20 por página
        * search: Valor utilizado para filtrar información de la tabla según las coincidencias con este valor
        * inmuebles: Contiene la información del total de las propiedades que se van a exponer en dicha tabla
        * openModal: Contiene un valor booleano que cuando está en true, abre un modal con información, cuando está en false, cierra el modal
        * loaderActive: Contiene un valor booleano que cuando está en true, significa que hay una petición HTTP en curso
        * memoizedFetchData: Función que memoiza el resultado de la función fetchDataResidencial()
        * handleObservation: Función que activa el modal para modificar la observación de un Lead en específico
*/

import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { WordKeysTable } from '@/interfaces'

const useTables = (param: string) => {

    const wordKeys: WordKeysTable = {
        traces: ['AllHuellas', 'getHuellas'],
        deletes: ['allDeletes', 'getDelete'],
        leadsC: ['getAllLeadsC', 'UserLeadComercial'],
        leadsR: ['getAllLeadsR', 'UserLeadResidencia']
    }
    
    const fetchDataResidencial = async () => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}');
            setRol(sessionInfo?.answer[0]?.rol)
            const adminData = `${process.env.BACK_LINK}/api/${wordKeys[param][0]}`;
            const userData = `${process.env.BACK_LINK}/api/${wordKeys[param][1]}/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`;
            
            const response = await axios.get(sessionInfo?.answer[0]?.rol == 'admin' ? adminData : userData, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
        const availableStatus = ['uncheck', 'check', 'discard']
        const [id, setId] = React.useState(0)
        const [page, setPage] = React.useState(0)
        const [rol, setRol] = React.useState('')
        const [data, setData] = React.useState([])
        const [search, setSearch] = React.useState("")
        const [openModal, setOpenModal] = React.useState(false)
        const [loaderActive, setLoaderActive] = React.useState(true)

        const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
        
        React.useEffect(() => {
            const fetchDataAndSetState = async () => {
                try {
                    const data = await memoizedFetchData
                    setData(data || [])
                    setLoaderActive(false)
                } catch (error) {
                    console.error(error)
                    setLoaderActive(false)
                }
            }
    
            fetchDataAndSetState()
        }, [memoizedFetchData])

        const handleObservation = (id: number) => {
            setOpenModal(true)
            setId(id)
        }

  return {
    id, 
    rol,
    page, 
    data,
    setId,
    search,
    setPage,
    openModal,
    setSearch,
    setOpenModal,
    loaderActive,
    availableStatus,
    handleObservation
  }
}

export default useTables