/*
    Funciones de utilidad dentro del proyecto: 
        * handleDeleteC: Función para eliminar una propiedad de tipo Comercial mediante la confirmación al interior de un componente modal
        * handleDeleteR: Función para eliminar una propiedad de tipo Residencial mediante la confirmación al interior de un componente modal
        * formatPrice: Función para agregar signos de puntuación y de precio, para transformar un número en un valor comercial de moneda
        * getDate: Función para obtener el día actual del mes
*/

import axios from 'axios'
import Cookies from 'js-cookie'

export const handleDeleteC = (setState: React.Dispatch<React.SetStateAction<boolean>>, id: number) => {
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

export const handleDeleteR = (setState: React.Dispatch<React.SetStateAction<boolean>>, id: number) => {
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