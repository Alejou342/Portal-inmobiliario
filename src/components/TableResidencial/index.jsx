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
        const sessionInfo = JSON.parse(Cookies.get('SessionInfo'))
        setLoaderActive(true)
        axios.get(`${process.env.BACK_LINK}/api/UserResidencia/${sessionInfo?.answer[0]?.Correo_Inmobiliaria}`, {
            headers: {
                "Authorization": `Bearer ${sessionInfo.accesToken}`
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
    <div className="table-responsive bg-white max-w-5xl">
        <Loader active={loaderActive} />
        <ModalGeneral state={openModal} setState={setOpenModal}>
            <ResidencialContent setState={setOpenModal} />
        </ModalGeneral>
        <h1 className="text-center mb-4 text-3xl font-bold text-green-500">Mis Propiedades Residenciales</h1>
        <table className="table table-hover border-2 overflow-auto h-4/6">
            <thead className='border'>
                <tr>        
                    <th className='border px-2 font-bold text-green-400'> ID Inmueble </th>                    
                    <th className='border px-2 font-bold text-green-400'>Nombre Inmueble</th>
                    <th className='border px-2 font-bold text-green-400'> Tipo Negocio </th>                                              
                    <th className='border px-2 font-bold text-green-400'>Precio Inmueble</th>    
                    <th className='border px-2 font-bold text-green-400'>Estado</th>                                              
                    <th className='border px-2 font-bold text-green-400'>Editar</th>                                              
                    <th className='border px-2 font-bold text-green-400'>Eliminar</th>                                              
                </tr>
            </thead>
            <tbody>
                {inmuebles.map(inmueble => 
                <tr key={inmueble.ID_Residencial} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{inmueble.ID_Residencial}</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>{inmueble.NombreR}</td>
                    <td className='border px-2 text-center'>{inmueble.Tipo_ServicioR}</td>
                    <td className='border px-2 text-center'>$ {inmueble.PrecioR}</td>
                    <td className='border px-2'>{inmueble.EstadoR == "Disponible" ? <Image src="/assets/green-circle.png" alt="green.png" width={20} height={20} className="mx-auto" /> : <Image src="/assets/red-circle.png" alt="red.png" width={20} height={20} className="mx-auto" /> }</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/edit/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>
                        <Image src="/assets/edit.png" alt="edit.png" width={20} height={20} className="mx-auto" />
                    </td> 
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleDelete(inmueble.ID_Residencial)}>
                        <Image src="/assets/delete.png" alt="delete.png" width={20} height={20} className="mx-auto" />
                    </td>
                </tr>)}           
            </tbody>          
        </table>
    </div>  
  )
}

export default Index