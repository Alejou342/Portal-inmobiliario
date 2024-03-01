import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useLeadTable = (admin, user) => {

    const fetchDataLeads = async () => {
        try {
            const userInfo = JSON.parse(Cookies?.get('SessionInfo'))
            setRol(userInfo?.answer[0]?.rol)

            const adminLeads = [axios.get(`${process.env.BACK_LINK}/api/${admin}`)]
            const userLeads = [axios.get(`${process.env.BACK_LINK}/api/${user}/${userInfo?.answer[0]?.Correo_Inmobiliaria}`)]

            let response
            if (userInfo?.answer[0]?.rol == 'admin') {
                response = await Promise.all(adminLeads)
            } else {
                response = await Promise.all(userLeads)
            }

            const responseData = response.map(res => res.data)
            return responseData
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    const availableStatus = ['Pendiente', 'Atendido', 'Descartado']
    const [id, setId] = React.useState(0)
    const [rol, setRol] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [leads, setLeads] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(true)

    const memoizedFetchData = React.useMemo(() => fetchDataLeads(), [])

    React.useEffect(() => {


        const fetchDataAndSetState = async () => {
            try {
                const data = await memoizedFetchData

                if (rol == 'Jazmin') {
                    setLeads(data?.flat()
                    .filter(lead => lead.revisado == 2)
                    .sort((a, b) => (a.Fechalead < b.Fechalead) ? 1 : ((b.Fechalead < a.Fechalead) ? -1 : 0)))
                } else {
                    setLeads(data?.flat()
                    .sort((a, b) => (a.Fechalead < b.Fechalead) ? 1 : ((b.Fechalead < a.Fechalead) ? -1 : 0)))
                }
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
        leads,
        search,
        openModal,
        loaderActive,
        setPage,
        setSearch,
        setOpenModal,
        availableStatus,
        handleObservation
    }
}

export default useLeadTable