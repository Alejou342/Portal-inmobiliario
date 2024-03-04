import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import FormData from 'form-data'

const useInmobiliary = () => {
    
    const [inmobiliarias, setInmobiliarias] = React.useState([])
    const [loaderActive, setLoaderActive] = React.useState(false)

    React.useEffect(() => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            setLoaderActive(true)
            axios.get(`${process.env.BACK_LINK}/api/getI`, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then((result) => {
                setInmobiliarias(result.data)
                setLoaderActive(false)
            })
            .catch((error) => { 
                console.error(error) 
                setLoaderActive(false)
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const sendEmail = (to, subject, text) => {
        const form = new FormData()

        form.append('from', 'noreply@cpocket.global')
        form.append('to', to)
        form.append('subject', subject)
        form.append('text', `¡Buenos días Lina! \nAdjunto el resumen de leads del mes actual: \n\n${text} \n¡Feliz día!`)

        try {
            axios.post(`${process.env.MAILGUN_LINK}`, form, {
                headers: {
                    Authorization: `Basic ${process.env.MAILGUN_TOKEN}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(() => console.log('Email enviado con éxito'))
            .catch((error) => console.error(error))
        } catch(error) {
            console.error(error)
        }
    }

  return {
    inmobiliarias, 
    setInmobiliarias,
    loaderActive,
    setLoaderActive,
    sendEmail
  }
}

export default useInmobiliary