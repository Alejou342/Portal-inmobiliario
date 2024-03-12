import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface InmobiliariaData {
    ID_Inmobiliaria: number;
    Nombre_Inmobiliaria: string;
    Correo_Inmobiliaria: string;
    Telefono_Inmobiliaria: string | null;
    Ubicacion_Inmobiliaria: string | null;
    Estado: number;
    Fecharegistro: string;
    Numeroidentificacion: string | null;
    Representante: string;
    Tipoidentificacion: string | null;
    Municipio: string;
    Departamento: string;
    Telefonorepresen: string | null;
    Celular: string;
    Correofacturacion: string | null;
    Personaencargada: string;
    Cargo: string | null;
    Telefonocargo: string;
    cantidadLeads: number;
    rol: string;
    Contraseña2: string | null;
    Contraseña3: string | null;
    reserva: string | null;
    Contraseña4: string | null;
  }

interface LoginApiResponse {
    answer: InmobiliariaData[];
    token: string;
}

interface FormData {
    Correo: string
    Contraseña: string
}

const useLogin = () => {

    const router = useRouter()
    const [loaderActive, setLoaderActive] = React.useState(false)
    const [alert, setAlert] = React.useState('')

    const [formData, setFormData] = React.useState<FormData>({
        Correo: '',
        Contraseña: '',
    }); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };

    const eventLogin = (response: AxiosResponse<LoginApiResponse>) => {
        router.push('/main')
        Cookies.set('SessionInfo', JSON.stringify(response.data))
        setLoaderActive(false)
    }

    const eventLoginFailed = (error: any) => {
        setLoaderActive(false)
        setAlert(error?.response?.data)
    }

    const onLoginSubmit = (e: any) => {
        setAlert('')
        e.preventDefault()
        setLoaderActive(true)
        axios.post(`${process.env.BACK_LINK}/api/loginUser`, formData)
        .then((response) => eventLogin(response))
        .catch((error) => eventLoginFailed(error))
    }

  return { loaderActive, alert, handleInputChange, onLoginSubmit, formData }
}

export default useLogin