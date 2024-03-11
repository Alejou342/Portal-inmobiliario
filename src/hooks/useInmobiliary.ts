import axios from 'axios'
import FormData from 'form-data'
import useGET from '@/hooks/useGET'

const useInmobiliary = (url: string) => {

    const { data, loading, error } = useGET(url)

    const sendEmail = (to: string, subject: string, text: string) => {
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
    data, 
    loading, 
    error,
    sendEmail
  }
}

export default useInmobiliary