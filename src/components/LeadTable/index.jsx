import React from 'react'
import Image from 'next/image'
import Loader from '@/components/Loader'
import axios from 'axios'
import Cookies from 'js-cookie'

const Index = () => {

    const [leads, setLeads] = React.useState([])
    const [loaderActive, setLoaderActive] = React.useState(true)

    React.useEffect(() => {
        try {
            const userInfo = JSON.parse(Cookies.get('SessionInfo'))

            const adminLeads = [
                axios.get(`${process.env.BACK_LINK}/api/getAllLeadsR`),
                axios.get(`${process.env.BACK_LINK}/api/getAllLeadsC`)
            ]
        
            const userLeads = [
                axios.get(`${process.env.BACK_LINK}/api/UserLeadResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`),
                axios.get(`${process.env.BACK_LINK}/api/UserLeadComercial/${userInfo?.answer[0]?.Correo_Inmobiliaria}`)
            ]
        
            setLoaderActive(true)
            Promise.all(userInfo?.answer[0]?.rol == 'admin' ? adminLeads : userLeads)
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

  return (
    <div className="bg-primary max-w-5xl max-h-[80vh] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <h1 className="text-center mb-4 text-3xl font-bold text-auxiliar">Leads</h1>
        <table className="table table-hover bg-auxiliar">
            <thead className='bg-secondary text-white'>
                <tr>        
                    <th className='border px-2 text-sm font-bold'> # </th>                    
                    <th className='border px-2 text-sm font-bold'> Código </th>                    
                    <th className='border px-2 text-sm font-bold'>Nombre inmueble</th>                                                                                            
                    <th className='border px-2 text-sm font-bold'>Nombre Cliente</th>
                    <th className='border px-2 text-sm font-bold'>Teléfono Cliente</th>                                              
                    <th className='border px-2 text-sm font-bold'>Fecha de generación</th>                                              
                    <th className='border px-2 text-sm font-bold'>Hora de generación</th>                                              
                </tr>
            </thead>
            <tbody>
                {leads.map((lead, id) => 
                <tr key={id + 1} className="cursor-pointer hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{lead?.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center'>{lead?.NombreR?.substring(0,40) || lead?.NombreC?.substring(0,40)}</td>
                    <td className='border px-2 text-center'>{lead?.Nombrecliente}</td>
                    <td className='border px-2 text-center'>{lead?.Numerocliente}</td>
                    <td className='border px-2 text-center'>{lead?.Fechalead.substr(0,10)}</td>
                    <td className='border px-2 text-center'>{lead?.Fechalead.substr(11,5)}</td>
                </tr>)}           
            </tbody>          
        </table>
        <div className="bg-primary text-white rounded-md text-center my-1">
            <b>Total Leads este mes: </b> {leads.length}
        </div>
    </div>  
  )
}

export default Index