import axios from 'axios'
import Cookies from 'js-cookie'

export const handleDeleteC = (setState: any, id: number) => {
    try {
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
        axios.post(`${process.env.BACK_LINK}/api/deleteComercial/${id}`, { Personaencargada: sessionInfo?.answer[0]?.Personaencargada }, {
            headers: {
                "Authorization": `Bearer ${sessionInfo?.token}`
            }
        })
        .then(() => {
            setState(false)
            location.reload()
        })
        .catch((error) => { 
            console.error(error) 
            setState(false)
        })
    } catch (error) {
        console.error(error)
    }
}

export const handleDeleteR = (setState: any, id: number) => {
    try {
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '?')
        axios.post(`${process.env.BACK_LINK}/api/deleteResidencial/${id}`, { Personaencargada: sessionInfo?.answer[0]?.Personaencargada }, {
            headers: {
                "Authorization": `Bearer ${sessionInfo?.token}`
            }
        })
        .then(() => {
            setState(false)
            location.reload()
        })
        .catch((error) => { 
            console.error(error) 
            setState(false)
        })
    } catch (error) {
        console.error(error)
    }
}

export const formatPrice = (number: number) => {
    return number?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
};

export const getDate = () => {
    const date = new Date()
    return date.getDate()
}