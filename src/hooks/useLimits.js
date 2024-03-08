import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useLimits = (setState) => {

    const [value, setValue] = React.useState(null)
    const [loaderActive, setLoaderActive] = React.useState(true)
    const [leads, setLeads] = React.useState([])

    React.useEffect(() => {
        try {
            setLoaderActive(true)
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            Promise.all([
                axios.get(
                `${process.env.BACK_LINK}/api/UserLeadResidencia/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`,
                { headers: { Authorization: `Bearer ${sessionInfo?.token}` }}),
                axios.get(
                `${process.env.BACK_LINK}/api/UserLeadComercial/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`,
                {headers: { Authorization: `Bearer ${sessionInfo?.token}` }})  
            ])
            .then(([response1, response2]) => {
                setLeads([...response1.data, ...response2.data])
                setLoaderActive(false)
            })
            .catch(error => {
                console.error(error)
                setLoaderActive(false)
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            axios.patch(`${process.env.BACK_LINK}/api/amountLead/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, 
            { Numero: parseInt(value)}, { 
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then(() => {
                location.reload()
                setState(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

  return { value, loaderActive, leads, handleChange, handleSubmit }
}

export default useLimits