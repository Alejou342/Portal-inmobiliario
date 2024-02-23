import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import TableHeader from '@/components/TableHeader'
import TableFooter from '@/components/TableFooter'
import ModalGeneral from '@/containers/ModalGeneral'
import SearchSection from '@/components/SearchSection'
import ObservationForm from '@/components/ObservationForm'

const fetchDataLeads = async () => {
    try {
        const userInfo = JSON.parse(Cookies?.get('SessionInfo'))

        const adminLeads = [axios.get(`${process.env.BACK_LINK}/api/getAllLeadsR`)]
        const userLeads = [axios.get(`${process.env.BACK_LINK}/api/UserLeadResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`)]

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

    const [id, setId] = React.useState(0)
    const [rol, setRol] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [leads, setLeads] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(true)

    const memoizedFetchData = React.useMemo(() => fetchDataLeads(), [])

    React.useEffect(() => {

        const userInfo = JSON.parse(Cookies?.get('SessionInfo'));
        setRol(userInfo?.answer[0]?.rol)

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
    
    const handleChecked = async (lead) => {

        try {
            setLeads(prevLeads => {
                return prevLeads.map(prevLead => {
                    if (prevLead.Idlead === lead.Idlead) {
                        return {
                            ...prevLead,
                            revisado: !prevLead.revisado
                        };
                    }
                    return prevLead;
                });
            });

            await axios.put(`${process.env.BACK_LINK}/api/Residencial/updateRevisado/${lead.Idlead}`
            , { newStatus: !lead?.revisado });
        } catch (error) {
            console.error(error);
        }
    }

    const handleObservation = (id) => {
        setOpenModal(true)
        setId(id)
    }

  return (
    <>
        { openModal && 
        <ModalGeneral state={openModal} setState={setOpenModal} className='p-4'>
            <ObservationForm setState={setOpenModal} id={id} letter="R" />
        </ModalGeneral>}
        <div className="bg-primary w-[70rem] overflow-auto py-1 rounded-md">
            <Loader active={loaderActive} />
            <div className="flex justify-between my-2 w-4/5 mx-auto items-center">
                <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Leads Residenciales</h1>
                <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
            </div>
            <table className="table table-hover bg-auxiliar w-full">
                {rol !== 'admin' 
                ? <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Nombre Cliente', 'Teléfono Cliente', 'Fecha de generación', 'Hora de generación', 'Estado', 'Observaciones']} />
                : <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Nombre Cliente', 'Teléfono Cliente', 'Fecha de generación', 'Hora de generación']} />}
                <tbody>
                    {leads
                    .filter(lead => lead?.CodigoInmobiliaria?.includes(search))
                    .slice(page * 20, page * 20 + 20)
                    .map((lead, id) => 
                    <tr key={id + 1} className="cursor-pointer hover:bg-slate-300">
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{id + 1}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.CodigoInmobiliaria}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.NombreR?.substring(0,25)}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.Nombrecliente.substr(0,10)}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.Numerocliente.substr(2,10)}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.Fechalead.substr(0,10)}</td>
                        <td className='border px-2 text-center' onClick={() => handleObservation(lead?.Idlead)}>{lead?.Fechalead.substr(11,5)}</td>
                        {rol !== 'admin' && <td className='border px-2 text-center'>
                            <input type="checkbox" checked={lead.revisado} onChange={() => handleChecked(lead)}/>
                        </td>}
                        <td className='border px-2 text-center text-xs' title={lead?.Observacion} onClick={() => handleObservation(lead?.Idlead)}>
                            {(lead?.Observacion?.length > 16) ? lead?.Observacion?.substr(0,16).concat('...') : lead?.Observacion}
                        </td>
                    </tr>)}           
                </tbody>          
            </table>
            <TableFooter 
            param={leads.filter(lead => lead?.CodigoInmobiliaria?.includes(search))} 
            text="Total Leads Residenciales este mes:" 
            page={page} 
            setPage={setPage}
            number={20}
            />
        </div>  
    </>
  )
}

export default Index
