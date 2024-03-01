import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import SearchSection from '@/components/SearchSection'

const fetchDataResidencial = async () => {
    try {
        const userInfo = JSON.parse(Cookies?.get('SessionInfo'));
        const deletes = `${process.env.BACK_LINK}/api/getDelete/${userInfo?.answer[0]?.Correo_Inmobiliaria}`;

        const response = await axios.get(deletes, {
            headers: {
                "Authorization": `Bearer ${userInfo?.accesToken}`
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
    const [inmuebles, setInmuebles] = React.useState([])
    const [loaderActive, setLoaderActive] = React.useState(true)
    
    const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
    
    React.useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await memoizedFetchData
                setInmuebles(data)
                setLoaderActive(false)
            } catch (error) {
                console.error(error)
                setLoaderActive(false)
            }
        }

        fetchDataAndSetState()
    }, [memoizedFetchData])

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 m-2 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Papelera de reciclaje</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Código', 'Tipo Inmueble', 'Persona', 'Enlace']} />
            <tbody>
                {inmuebles
                .filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble, id) => 
                <tr key={id + 1} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer'>{inmueble?.Tipo}</td>
                    <td className='border px-2 text-center'>{inmueble.Personaencargada}</td>    
                    <td className='border px-2 text-center w-[5%]'>
                        <Link href={inmueble.Enlace} target='blank'>
                            <Image src='/assets/link.svg' alt='link.svg' width={15} height={15} className='mx-auto' />
                        </Link>
                    </td>
                </tr>)}    
            </tbody>          
        </table>
        <TableFooter 
            param={inmuebles.filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))} 
            text="Total propiedades eliminadas:" 
            page={page} 
            setPage={setPage} 
            number={20}
        />
    </div>  
  )
}

export default Index