import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/formatPrice'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import ModalGeneral from '@/containers/ModalGeneral'
import SearchSection from '@/components/SearchSection'
import ResidencialContent from '@/components/ResidencialContent'

const fetchDataResidencial = async () => {
    try {
        const userInfo = JSON.parse(Cookies.get('SessionInfo'));
        const adminResidencials = `${process.env.BACK_LINK}/api/getAllR`;
        const userResidencials = `${process.env.BACK_LINK}/api/UserResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`;

        const response = await axios.get(userInfo?.answer[0]?.rol === 'admin' ? adminResidencials : userResidencials, {
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

    const router = useRouter()
    const [rol, setRol] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [search, setSearch] = React.useState("")
    const [inmuebles, setInmuebles] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(true)
    
    const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
    
    React.useEffect(() => {
        const userInfo = JSON.parse(Cookies.get('SessionInfo'));
        setRol(userInfo?.answer[0]?.rol)
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

    const handleNavigate = (url, id) => {
        Cookies.set('ResidencialID', id)
        router.push(url)
    }

    const handleDelete = (id) => {
        Cookies.set('ResidencialID', id)
        setOpenModal(true)
    }

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <ModalGeneral state={openModal} setState={setOpenModal}>
            <ResidencialContent setState={setOpenModal} />
        </ModalGeneral>
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Propiedades Residenciales</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            {(rol == 'user' || rol == 'admin')
            ? <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Tipo Negocio', 'Precio Inmueble', 'Estado', 'Editar', 'Eliminar']} />
            : <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Tipo Negocio', 'Precio Inmueble', 'Estado', 'Editar']} />}
            <tbody>
                {inmuebles
                .filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble, id) => 
                <tr key={inmueble.ID_Residencial} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>{inmueble?.NombreR?.substring(0,35)}</td>
                    <td className='border px-2 text-center'>{inmueble.Tipo_ServicioR}</td>
                    <td className='border px-2 text-center'>{formatPrice(inmueble.PrecioR)}</td>
                    <td className='border px-2'>
                        {inmueble.EstadoR == "Disponible" 
                        ? <Image src="/assets/green-circle.svg" alt="green.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" /> 
                        : <Image src="/assets/red-circle.svg" alt="red.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" />}
                    </td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/edit/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>
                        <Image src="/assets/edit.svg" alt="edit.svg" width={20} height={20} className="mx-auto" />
                    </td> 
                    {(rol == 'user' || rol == 'admin') && 
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleDelete(inmueble.ID_Residencial)}>
                        <Image src="/assets/delete.svg" alt="delete.svg" width={20} height={20} className="mx-auto" />
                    </td>}
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
            param={inmuebles.filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))} 
            text="Total Propiedades Residenciales:" 
            page={page} 
            setPage={setPage} 
        />
    </div>  
  )
}

export default Index