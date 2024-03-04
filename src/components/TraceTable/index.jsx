import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import { formatPrice } from '@/utils/formatPrice'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import SearchSection from '@/components/SearchSection'

const fetchDataResidencial = async () => {
    try {
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'));
        const adminTraces = `${process.env.BACK_LINK}/api/AllHuellas`;
        const userTraces = `${process.env.BACK_LINK}/api/getHuellas/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`;

        const response = await axios.get(sessionInfo?.answer[0]?.rol === 'admin' ? adminTraces : userTraces, {
            headers: {
                "Authorization": `Bearer ${sessionInfo?.accesToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const Index = () => {

    const [page, setPage] = React.useState(0)
    const [search, setSearch] = React.useState("")
    const [traces, setTraces] = React.useState([])
    const [loaderActive, setLoaderActive] = React.useState(true)
    
    const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
    
    React.useEffect(() => {

        const fetchDataAndSetState = async () => {
            try {
                const data = await memoizedFetchData
                setTraces(data.sort((a, b) => (a.Fechaingreso < b.Fechaingreso) ? 1 : ((b.Fechaingreso < a.Fechaingreso) ? -1 : 0)))
                setLoaderActive(false)
            } catch (error) {
                console.error(error)
                setLoaderActive(false)
            }
        }

        fetchDataAndSetState()
    }, [memoizedFetchData])

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Registro de ingresos</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} type='text' placeholder='encargado' />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Correo', 'Fecha Ingreso', 'Hora Ingreso', 'Encargado']} />
            <tbody>
                {traces
                .filter(inmueble => inmueble.Personaencargada?.toLowerCase().includes(search.toLowerCase()))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble, id) => 
                <tr key={id + 1} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble.Correo}</td>
                    <td className='border px-2 text-center'>{inmueble.Fechaingreso.substr(0,10)}</td>
                    <td className='border px-2 text-center'>{inmueble.Fechaingreso.substr(11,5)}</td>
                    <td className='border px-2 text-center'>{inmueble.Personaencargada.substr(0,15)}</td>
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
            param={traces.filter(inmueble => inmueble.Personaencargada?.toLowerCase().includes(search.toLowerCase()))} 
            text="Total ingresos:" 
            page={page} 
            setPage={setPage} 
            number={20}
        />
    </div>  
  )
}

export default Index