import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import TableHeader from '@/components/TableHeader'
import TableFooter from '@/components/TableFooter'
import SearchSection from '@/components/SearchSection'

const fetchDataLeads = async () => {
    try {
        const userInfo = JSON.parse(Cookies?.get('SessionInfo'))

        const adminLeads = [
            axios.get(`${process.env.BACK_LINK}/api/getAllLeadsR`),
            axios.get(`${process.env.BACK_LINK}/api/getAllLeadsC`)
        ]
    
        const userLeads = [
            axios.get(`${process.env.BACK_LINK}/api/UserLeadResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`),
            axios.get(`${process.env.BACK_LINK}/api/UserLeadComercial/${userInfo?.answer[0]?.Correo_Inmobiliaria}`)
        ]

        let response
        if (userInfo?.answer[0]?.rol == 'admin') {
            response = await Promise.all(adminLeads)
        } else {
            response = await Promise.all(userLeads)
        }

        const responseData = response.map(res => res.data)
        return responseData
    } catch (error) {
        console.error(error)
        throw error
    }
}

const Index = () => {

    const [page, setPage] = React.useState(0)
    const [leads, setLeads] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [loaderActive, setLoaderActive] = React.useState(true)

    const memoizedFetchData = React.useMemo(() => fetchDataLeads(), [])

    React.useEffect(() => {

        const fetchDataAndSetState = async () => {
            try {
                const data = await memoizedFetchData
                setLeads(
                    data?.flat()
                    .sort((a, b) => (a.Fechalead < b.Fechalead) ? 1 : ((b.Fechalead < a.Fechalead) ? -1 : 0)))
                setLoaderActive(false)
            } catch (error) {
                console.error(error)
                setLoaderActive(false)
            }
        }

        fetchDataAndSetState()
    }, [memoizedFetchData])

    console.log(leads)

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 w-4/5 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Leads</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Nombre Cliente', 'Teléfono Cliente', 'Fecha de generación', 'Hora de generación']} />
            <tbody>
                {leads
                .filter(lead => lead?.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((lead, id) => 
                <tr key={id + 1} className="cursor-pointer hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{lead?.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center'>{lead?.NombreR?.substring(0,30) || lead?.NombreC?.substring(0,30)}...</td>
                    <td className='border px-2 text-center'>{lead?.Nombrecliente.substr(0,10)}...</td>
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