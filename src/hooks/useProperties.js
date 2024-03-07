import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const useProperties = (param) => {

    const wordKeys = {
        residencial: ['getAllR', 'UserResidencia', 'ResidencialID'],
        comercial: ['getAllC', 'UserComercial', 'ComercialID']
    }

    const fetchDataResidencial = async () => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'));
            const adminEndpoint = `${process.env.BACK_LINK}/api/${wordKeys[param][0]}`;
            const userEndpoint = `${process.env.BACK_LINK}/api/${wordKeys[param][1]}/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`;
    
            const response = await axios.get(sessionInfo?.answer[0]?.rol === 'admin' ? adminEndpoint : userEndpoint, {
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
    
        const router = useRouter()
        const [id, setId] = React.useState(null)
        const [rol, setRol] = React.useState('')
        const [page, setPage] = React.useState(0)
        const [search, setSearch] = React.useState("")
        const [inmuebles, setInmuebles] = React.useState([])
        const [openModal, setOpenModal] = React.useState(false)
        const [loaderActive, setLoaderActive] = React.useState(true)
    
        const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
        
        React.useEffect(() => {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            setRol(sessionInfo?.answer[0]?.rol)
            const fetchDataAndSetState = async () => {
                try {
                    const data = await memoizedFetchData
                    setInmuebles(data.toReversed())
                    setLoaderActive(false)
                } catch (error) {
                    console.error(error)
                    setLoaderActive(false)
                }
            }
    
            fetchDataAndSetState()
        }, [memoizedFetchData])
    
        const handleNavigate = (url, id) => {
            Cookies.set(`${wordKeys[param][2]}`, id)
            setId(id)
            router.push(url)
        }
        
        const handleDelete = (id) => {
            Cookies.set(`${wordKeys[param][2]}`, id)
            setId(id)
            setOpenModal(true)
        }

  return {
    id,
    rol,
    page,
    search,
    setPage,
    setSearch,
    openModal,
    inmuebles,
    loaderActive,
    handleDelete,
    setOpenModal,
    handleNavigate,
  }
}

export default useProperties