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
                    "Authorization": `Bearer ${sessionInfo?.accesToken}`
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
        form.append('text', `¡Buenos días Lina! \nAdjunto el resumen de leads del mes de Febrero: \n\n${text} \n¡Feliz día!`)

        try {
            axios.post('https://api.mailgun.net/v3/cpocket.global/messages', form, {
                headers: {
                    Authorization: `Basic YXBpOmJlMjE4MDk5YjFhMzMxYjdkMDhmOTI3MWZlZjA3MmViLTEzNWE4ZDMyLWVmMGNhOTk5`,
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