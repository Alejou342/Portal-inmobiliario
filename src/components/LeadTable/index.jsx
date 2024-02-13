import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import TableFooter from '@/components/TableFooter'
import SearchSection from '@/components/SearchSection'

const Index = () => {

    const [page, setPage] = React.useState(0)
    const [leads, setLeads] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [loaderActive, setLoaderActive] = React.useState(true)

    React.useEffect(() => {
        try {
            setLoaderActive(true)
            const userInfo = JSON.parse(Cookies.get('SessionInfo'))

            const adminLeads = [
                axios.get(`${process.env.BACK_LINK}/api/getAllLeadsR`),
                axios.get(`${process.env.BACK_LINK}/api/getAllLeadsC`)
            ]
        
            const userLeads = [
                axios.get(`${process.env.BACK_LINK}/api/UserLeadResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`),
                axios.get(`${process.env.BACK_LINK}/api/UserLeadComercial/${userInfo?.answer[0]?.Correo_Inmobiliaria}`)
            ]

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
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 w-4/5 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Leads</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <thead className='bg-secondary text-white h-10'>
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
                {leads
                .filter(lead => lead?.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((lead, id) => 
                <tr key={id + 1} className="cursor-pointer hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{lead?.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center'>{lead?.NombreR?.substring(0,30) || lead?.NombreC?.substring(0,30)}</td>
                    <td className='border px-2 text-center'>{lead?.Nombrecliente.substr(0,15)}</td>
                    <td className='border px-2 text-center'>{lead?.Numerocliente.substr(2,10)}</td>
                    <td className='border px-2 text-center'>{lead?.Fechalead.substr(0,10)}</td>
                    <td className='border px-2 text-center'>{lead?.Fechalead.substr(11,5)}</td>
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
        param={leads.filter(lead => lead?.CodigoInmobiliaria?.includes(search))} 
        text="Total Leads este mes:" 
        page={page} 
        setPage={setPage} 
        />
    </div>  
  )
}

export default Index