import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import ModalGeneral from '@/containers/ModalGeneral'
import ResidencialContent from '@/components/ResidencialContent'

const Index = () => {

    const [inmuebles, setInmuebles] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        try {
            const userInfo = JSON.parse(Cookies.get('SessionInfo'))

            const adminResidencials = `${process.env.BACK_LINK}/api/getAllR`
            const userResidencials = `${process.env.BACK_LINK}/api/UserResidencia/${userInfo?.answer[0]?.Correo_Inmobiliaria}`

            setLoaderActive(true)
            axios.get(userInfo?.answer[0]?.rol == 'admin' ? adminResidencials : userResidencials, {
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
        Cookies.set('ResidencialID', id)
        router.push(url)
    }

    const handleDelete = (id) => {
        Cookies.set('ResidencialID', id)
        setOpenModal(true)
    }

  return (
    <div className="bg-primary max-w-5xl overflow-auto max-h-[80vh] py-1 rounded-md">
        <Loader active={loaderActive} />
        <ModalGeneral state={openModal} setState={setOpenModal}>
            <ResidencialContent setState={setOpenModal} />
        </ModalGeneral>
        <h1 className="text-center mb-4 text-3xl font-bold text-auxiliar">Mis Propiedades Residenciales</h1>
        <table className="table table-hover bg-auxiliar">
            <thead className='bg-secondary text-white'>
                <tr>        
                    <th className='border px-2 font-bold'> ID Inmueble </th>                    
                    <th className='border px-2 font-bold'>Nombre Inmueble</th>
                    <th className='border px-2 font-bold'> Tipo Negocio </th>                                              
                    <th className='border px-2 font-bold'>Precio Inmueble</th>    
                    <th className='border px-2 font-bold'>Estado</th>                                              
                    <th className='border px-2 font-bold'>Editar</th>                                              
                    <th className='border px-2 font-bold'>Eliminar</th>                                              
                </tr>
            </thead>
            <tbody>
                {inmuebles.map(inmueble => 
                <tr key={inmueble.ID_Residencial} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{inmueble.ID_Residencial}</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>{inmueble?.NombreR?.substring(0,40)}</td>
                    <td className='border px-2 text-center'>{inmueble.Tipo_ServicioR}</td>
                    <td className='border px-2 text-center'>$ {inmueble.PrecioR}</td>
                    <td className='border px-2'>
                        {inmueble.EstadoR == "Disponible" 
                        ? <Image src="/assets/green-circle.svg" alt="green.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" /> 
                        : <Image src="/assets/red-circle.svg" alt="red.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" />}
                    </td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/edit/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>
                        <Image src="/assets/edit.svg" alt="edit.svg" width={20} height={20} className="mx-auto" />
                    </td> 
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleDelete(inmueble.ID_Residencial)}>
                        <Image src="/assets/delete.svg" alt="delete.svg" width={20} height={20} className="mx-auto" />
                    </td>
                </tr>)}           
            </tbody>          
        </table>
        <div className="bg-primary text-white rounded-md text-center my-1">
            <b>Total Propiedades Residenciales: </b> {inmuebles.length}
        </div>
    </div>  
  )
}

export default Index