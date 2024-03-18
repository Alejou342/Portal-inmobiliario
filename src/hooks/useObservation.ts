/*
    Hook usado para realizar modificación a las observaciones y al estado de los Leads
        * availableStatus: Hace referencia a los estados posibles para los Leads generados
        * text: Hace referencia a una información adicional para los Leads generados
        * status: Hace referencia al estado de cada Lead, por defecto su valor será 'Pendiente'
        * loaderActive: Es una variable que retorna true mientras se completa una petición HTTP y false cuando se finaliza
*/

import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UseObservationProps } from '@/interfaces'

const useObservation = ({ setState, id, letter, type } : UseObservationProps) => {

    const availableStatus = ['Pendiente', 'Atendido', 'Descartado']
    const [text, setText] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('Pendiente')
    const [loaderActive, setLoaderActive] = React.useState<boolean>(false)

    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    const handleChangeList = (e: any) => {
        setStatus(e.target.value)
    }

    const handleSubmit = () => {
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
        try {
            Promise.all([
                axios.put(
                `${process.env.BACK_LINK}/api/observacion${letter}/${id}`, 
                { observacion: text }, {
                    headers: {
                        "Authorization": `Bearer ${sessionInfo?.token}`
                    }
                }),
                axios.put(
                `${process.env.BACK_LINK}/api/${type}/updateRevisado/${id}`, 
                { newStatus: availableStatus.indexOf(status) }, {
                    headers: {
                        "Authorization": `Bearer ${sessionInfo?.token}`
                    }
                })
            ])
            .then(() => location.reload())
            .catch(() => setLoaderActive(false))
            setState(false)
        } catch(error) {
            console.error(error)
            setState(false)
        }
    }

    return { availableStatus, text, status, loaderActive, handleChange, handleChangeList, handleSubmit }
}

export default useObservation