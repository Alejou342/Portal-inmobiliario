import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useNavbar = () => {

    const [leads, setLeads] = React.useState<any>([])
    const [total, setTotal] = React.useState<number>(0)
    const [number, setNumber] = React.useState<number>(0)
    const [rol, setRol] = React.useState<string>('')

    React.useEffect(() => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            setRol(sessionInfo?.answer[0]?.rol)

            Promise.all([
                axios.get(
                `${process.env.BACK_LINK}/api/UserLeadResidencia/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, 
                { headers: { Authorization: `Bearer ${sessionInfo?.token}` }}),
                axios.get(
                `${process.env.BACK_LINK}/api/UserLeadComercial/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, 
                { headers: { Authorization: `Bearer ${sessionInfo?.token}` }}),
                axios.get(
                `${process.env.BACK_LINK}/api/getAmountLeads/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, 
                { headers: { Authorization: `Bearer ${sessionInfo?.token}` }}),
                axios.get(
                `${process.env.BACK_LINK}/api/allLeads`, 
                { headers: { Authorization: `Bearer ${sessionInfo?.token}` }})
            ])
            .then(([response1, response2, response3, response4]) => {
                setLeads([...response1.data, ...response2.data])
                setTotal(response3.data)
                setNumber(response4.data)
            })
            .catch(error => {
                console.error(error)
            })

        } catch (error) {
            console.error('Error al obtener la Cookie', error)
        }
    }, [])

  return { leads, number, total, rol }
}

export default useNavbar