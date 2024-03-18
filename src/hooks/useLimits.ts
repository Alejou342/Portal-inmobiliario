/* 
    Hook que maneja la información y la lógica de los límites mensuales de Leads de las inmobiliarias:
        * setState: Es una variable que almacena un valor booleano para definir si el componente modal está abierto o cerrado
        * value: Es una variable que almacena el valor del límite de Leads acordado por cada inmobiliaria
        * leads: almacena la información actual de leads que posee cada inmobiliaria
        * handleChange: Es una función que maneja la información utilizada en los formularios
*/

import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useLimits = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {

    const [value, setValue] = React.useState<number>(0)
    const [loaderActive, setLoaderActive] = React.useState<boolean>(true)
    const [leads, setLeads] = React.useState<string[]>([])

    React.useEffect(() => {
        try {
            setLoaderActive(true)
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
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

    const handleChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            axios.patch(`${process.env.BACK_LINK}/api/amountLead/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, 
            { Numero: value}, { 
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