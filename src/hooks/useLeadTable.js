import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useLeadTable = (admin, user, type ) => {

    const fetchDataLeads = async () => {
        try {
            const userInfo = JSON.parse(Cookies?.get('SessionInfo'))

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

    const [id, setId] = React.useState(0)
    const [rol, setRol] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [leads, setLeads] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(true)

    const memoizedFetchData = React.useMemo(() => fetchDataLeads(), [])

    React.useEffect(() => {

        const userInfo = JSON.parse(Cookies?.get('SessionInfo'));
        setRol(userInfo?.answer[0]?.rol)

        const fetchDataAndSetState = async () => {
            try {
                const data = await memoizedFetchData
                setLeads(
                    data?.flat()
                    .sort((a, b) => (a.Fechalead < b.Fechalead) ? 1 : ((b.Fechalead < a.Fechalead) ? -1 : 0)))
                setLoaderActive(false)
            } catch (error) {
                console.error(error)
                setLoaderActive(false)
            }
        }

        fetchDataAndSetState()
    }, [memoizedFetchData]) 

    const handleChecked = async (lead) => {

        try {
            setLeads(prevLeads => {
                return prevLeads.map(prevLead => {
                    if (prevLead.Idlead === lead.Idlead) {
                        return {
                            ...prevLead,
                            revisado: !prevLead.revisado
                        };
                    }
                    return prevLead;
                });
            });

            await axios.put(`${process.env.BACK_LINK}/api/${type}/updateRevisado/${lead.Idlead}`
            , { newStatus: !lead?.revisado });
        } catch (error) {
            console.error(error);
        }
    }

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
        handleChecked,
        handleObservation
    }
}

export default useLeadTable