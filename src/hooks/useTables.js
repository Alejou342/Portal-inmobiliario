import React from 'react'
import axios from 'axios'
import { useItem } from '@/context'

const useTables = (param) => {

    const wordKeys = {
        traces: ['AllHuellas', 'getHuellas'],
        deletes: ['allDeletes', 'getDelete'],
        leadsC: ['getAllLeadsC', 'UserLeadComercial'],
        leadsR: ['getAllLeadsR', 'UserLeadResidencia']
    }

    const { sessionInfo } = useItem()
    const rol = sessionInfo?.answer[0]?.rol

    const fetchDataResidencial = async () => {
        try {
            const adminData = `${process.env.BACK_LINK}/api/${wordKeys[param][0]}`;
            const userData = `${process.env.BACK_LINK}/api/${wordKeys[param][1]}/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`;
            
            const response = await axios.get(rol == 'admin' ? adminData : userData, {
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