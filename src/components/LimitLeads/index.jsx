import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import LoginSection from '@/components/LoginSection'

const Index = ({ setState }) => {

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
                { headers: { Authorization: `Bearer ${sessionInfo?.accesToken}` }}),
                axios.get(
                `${process.env.BACK_LINK}/api/UserLeadComercial/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`,
                {headers: { Authorization: `Bearer ${sessionInfo?.accesToken}` }})  
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
                    "Authorization": `Bearer ${sessionInfo.accesToken}`
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

  return (
    <form className="form-limits" onSubmit={handleSubmit}>
        <Loader active={loaderActive} />
        <LoginSection 
            type="number"
            id="lead-limit"
            className={{label: 'flex justify-center', input: 'w-1/3 my-2'}}
            placeholder="Ej: 10"
            label="Límite mensual de leads"
            onChange={handleChange}
            value={value}
            minValue={leads.length}
            maxValue={500}
        />
        <Button type="submit" className="bg-primary text-auxiliar flex justify-center">
            Actualizar
        </Button>
    </form>
  )
}

export default Index