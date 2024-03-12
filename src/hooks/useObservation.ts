import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

interface UseObservationProps {
    setState: any
    id: number
    letter: string
    type: string
}

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

    const handleSuccess = () => {
        setLoaderActive(false)
        location.reload()
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoaderActive(true)
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
            .then(() => handleSuccess)
            .catch(() => handleSuccess)
            setState(false)
        } catch(error) {
            console.error(error)
            setState(false)
        }
    }

    return { availableStatus, text, status, loaderActive, handleChange, handleChangeList, handleSubmit }
}

export default useObservation