import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useTables = (param) => {

    const wordKeys = {
        traces: ['AllHuellas', 'getHuellas'],
        deletes: ['allDeletes', 'getDelete'],
        leadsR: ['getAllLeadsR', 'UserLeadResidencia'],
        leadsC: ['getAllLeadsC', 'UserLeadComercial']
    }

    const fetchDataResidencial = async () => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'));
            const rol = sessionInfo?.answer[0]?.rol
            const adminDeletes = `${process.env.BACK_LINK}/api/${wordKeys[param][0]}`;
            const userDeletes = `${process.env.BACK_LINK}/api/${wordKeys[param][1]}/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`;
            
            const response = await axios.get(rol == 'admin' ? adminDeletes : userDeletes, {
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

        const availableStatus = ['Pendiente', 'Atendido', 'Descartado']
        const [id, setId] = React.useState(0)
        const [page, setPage] = React.useState(0)
        const [data, setData] = React.useState([])
        const [search, setSearch] = React.useState("")
        const [openModal, setOpenModal] = React.useState(false)
        const [loaderActive, setLoaderActive] = React.useState(true)
    
        
        const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
        
        React.useEffect(() => {
            const fetchDataAndSetState = async () => {
                try {
                    const data = await memoizedFetchData
                    setData(data)
                    setLoaderActive(false)
                } catch (error) {
                    console.error(error)
                    setLoaderActive(false)
                }
            }
    
            fetchDataAndSetState()
        }, [memoizedFetchData])

        const handleObservation = (id) => {
            setOpenModal(true)
            setId(id)
        }

  return {
    availableStatus,
    id,
    setId,
    openModal,
    setOpenModal,
    page, 
    setPage,
    data,
    loaderActive,
    search,
    setSearch,
    handleObservation
  }
}

export default useTables