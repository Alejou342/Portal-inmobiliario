/* 
    Hook utilizado para proveer la información esencial para el renderizado de las tablas de propiedades (Comerciales y Residenciales)
        * param: Es un número el cual se utiliza para diferenciar los parámetros de las solicitudes utilizando el objeto wordKeys
        * wordKeys: Provee información relevante para completar la información de los Endpoints de admin y user
        * fetchDataResidencial: Función que se encarga de hacer fetch de la URL que recibe como parámetro
        * id: Esta variable guarda la información de cada propiedad y es un parámetro utilizado para llevar a cabo la navegación
        * router: Variable que utiliza el hook useRouter para realizar la navegación desde la tabla a cada propiedad en específico
        * page: Valor utilizado para manejar la paginación, ya que las propiedades solamente se muestran 20 por página
        * search: Valor utilizado para filtrar información de la tabla según las coincidencias con este valor
        * inmuebles: Contiene la información del total de las propiedades que se van a exponer en dicha tabla
        * openModal: Contiene un valor booleano que cuando está en true, abre un modal con información, cuando está en false, cierra el modal
        * loaderActive: Contiene un valor booleano que cuando está en true, significa que hay una petición HTTP en curso
        * memoizedFetchData: Función que memoiza el resultado de la función fetchDataResidencial()
        * handleNavigate: Función que utiliza useRouter para realizar la navegación desde la tabla hasta la card de la propiedad
        * handleDelete: Función que utiliza una petición POST para eliminar un inmueble, se ejecuta desde el botón "Aceptar" del Modal
*/

import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { WordKeysProperties } from '@/interfaces'

const useProperties = (param: string) => {

    const wordKeys: WordKeysProperties = {
        residencial: ['getAllR', 'UserResidencia', 'ResidencialID'],
        comercial: ['getAllC', 'UserComercial', 'ComercialID']
    }

    const fetchDataResidencial = async () => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}');
            const adminEndpoint = `${process.env.BACK_LINK}/api/${wordKeys[param][0]}`;
            const userEndpoint = `${process.env.BACK_LINK}/api/${wordKeys[param][1]}/${sessionInfo?.answer?.[0].Correo_Inmobiliaria}`;
    
            const response = await axios.get(sessionInfo?.answer?.[0].rol === 'admin' ? adminEndpoint : userEndpoint, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            });
    
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
        const router = useRouter()
        const [id, setId] = React.useState<string>('')
        const [rol, setRol] = React.useState<string>('')
        const [page, setPage] = React.useState<number>(0)
        const [search, setSearch] = React.useState<string>("")
        const [inmuebles, setInmuebles] = React.useState<any>([])
        const [openModal, setOpenModal] = React.useState<boolean>(false)
        const [loaderActive, setLoaderActive] = React.useState<boolean>(true)
    
        const memoizedFetchData = React.useMemo(() => fetchDataResidencial(), [])
        
        React.useEffect(() => {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            setRol(sessionInfo?.answer[0]?.rol)
            const fetchDataAndSetState = async () => {
                try {
                    const data = await memoizedFetchData
                    setInmuebles(data.toReversed())
                    setLoaderActive(false)
                } catch (error) {
                    console.error(error)
                    setLoaderActive(false)
                }
            }
    
            fetchDataAndSetState()
        }, [memoizedFetchData])
    
        const handleNavigate = (url: string, id: string) => {
            Cookies.set(`${wordKeys[param][2]}`, id)
            setId(id)
            router.push(url)
        }
        
        const handleDelete = (id: string) => {
            Cookies.set(`${wordKeys[param][2]}`, id)
            setId(id)
            setOpenModal(true)
        }

  return {
    id,
    rol,
    page,
    search,
    setPage,
    setSearch,
    openModal,
    inmuebles,
    loaderActive,
    handleDelete,
    setOpenModal,
    handleNavigate,
  }
}

export default useProperties