import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useTables = (param: string) => {

    const wordKeys: any = {
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

        console.log(rol)
    
        
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