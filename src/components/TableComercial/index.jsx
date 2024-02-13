"use client"
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
import ComercialContent from '@/components/ComercialContent'

const Index = () => {

    const router = useRouter()
    const [page, setPage] = React.useState(0)
    const [search, setSearch] = React.useState("")
    const [inmuebles, setInmuebles] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(false)

    React.useEffect(() => {
        try {
            const userInfo = JSON.parse(Cookies.get('SessionInfo'))
            setLoaderActive(true)

            const userComercials = `${process.env.BACK_LINK}/api/UserComercial/${userInfo?.answer[0]?.Correo_Inmobiliaria}`
            const adminComercials = `${process.env.BACK_LINK}/api/getAllC`

            axios.get(userInfo?.answer[0]?.rol == 'admin' ? adminComercials : userComercials ,  {
                headers: {
                    "Authorization": `Bearer ${userInfo?.accesToken}`
                }
            })
            .then((result) => {
                setInmuebles(result.data)
                setLoaderActive(false)
            })
            .catch((error) => { 
                console.error(error) 
                setLoaderActive(false)
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const handleNavigate = (url, id) => {
        Cookies.set('ComercialID', id)
        router.push(url)
    }

    const handleDelete = (id) => {
        Cookies.set('ComercialID', id)
        setOpenModal(true)
    }

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <ModalGeneral state={openModal} setState={setOpenModal}>
            <ComercialContent setState={setOpenModal} />
        </ModalGeneral>
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Propiedades Comerciales</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Tipo Negocio', 'Precio Inmueble', 'Estado', 'Editar', 'Eliminar']} />
            <tbody>
                {inmuebles
                .filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map(inmueble => 
                <tr key={inmueble.ID_Comercial} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{inmueble.ID_Comercial}</td>
                    <td className='border px-2 text-center'>{inmueble.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/comercial/${inmueble.ID_Comercial}`, inmueble.ID_Comercial)}>{inmueble?.NombreC?.substring(0,35)}</td>
                    <td className='border px-2 text-center'>{inmueble.Tipo_ServicioC}</td>
                    <td className='border px-2 text-center'>{formatPrice(inmueble.PrecioC)}</td>
                    <td className='border px-2'>
                        {inmueble.EstadoC == "Disponible" 
                        ? <Image src="/assets/green-circle.svg" alt="green.svg" title={inmueble.EstadoC} width={18} height={18} className="mx-auto cursor-pointer" /> 
                        : <Image src="/assets/red-circle.svg" alt="red.svg" title={inmueble.EstadoC} width={18} height={18} className="mx-auto cursor-pointer" /> }
                    </td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/comercial/edit/${inmueble.ID_Comercial}`, inmueble.ID_Comercial)}>
                        <Image src="/assets/edit.svg" alt="edit.svg" width={20} height={20} className="mx-auto" />
                    </td> 
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleDelete(inmueble.ID_Comercial)}>
                        <Image src="/assets/delete.svg" alt="delete.svg" width={20} height={20} className="mx-auto" />
                    </td>
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
        param={inmuebles.filter(inmueble => inmueble.CodigoInmobiliaria?.includes(search))} 
        text="Total Propiedades Comerciales:" 
        page={page} 
        setPage={setPage} 
        />
    </div>  
  )
}

export default Index