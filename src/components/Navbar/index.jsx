"use client"
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Index = () => {

    const [leads, setLeads] = React.useState([])
    const [total, setTotal] = React.useState(null)
    const [number, setNumber] = React.useState(null)
    const [rol, setRol] = React.useState('')

    React.useEffect(() => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
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

  return (
    <div className="navbar w-full justify-end flex fixed top-8 right-8">
        <div className="adviserment bg-auxiliar border-primary border-2 p-2 rounded-lg ">
        <span className='font-semibold text-sm'> Total Leads este mes: &nbsp; </span>
        {rol == 'admin' 
            ? <h1 className='font-bold text-center text-2xl text-primary'> {number?.Total} </h1>
            : <h1 className={`font-bold text-center text-2xl ${leads?.length == total?.cantidadLeads ? 'text-red-500' : 'text-primary'}`}> {`${leads?.length} / ${total?.cantidadLeads || 0}`} </h1>
        }
        </div>
    </div>
  )
}

export default Index