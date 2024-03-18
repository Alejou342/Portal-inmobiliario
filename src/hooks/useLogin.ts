/* 
    Hook que permite manejar los eventos asociados al Login de la aplicación:
        * router: Utiliza el hook useRouter que nos permite la navegación entre rutas en NextJS 
        * loaderActive: Variable que almacena el estado de carga de las peticiones HTTP asociadas a Login
        * alert: Variable que almacena el mensaje de error cuando la información de Login es incorrecta
        * formData: Recopila (Correo y Contraseña) como información para realizar la autenticación en el portal
        * handleInputChange: Es una función que se encarga de actualizar la información de las variables del objeto formData
        * onLoginSubmit: Es una función que envía la información de formData para la autenticación mediante una petición POST
        * eventLogin: Es una función que se ejecuta cuando la petición POST de Login ocurre con éxito
        * eventLoginFailed: Es una función que se ejecuta cuando la petición POST de Login ocurre sin éxito 
*/

import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { LoginApiResponse, FormData } from '@/interfaces'

const useLogin = () => {

    const router = useRouter()
    const [loaderActive, setLoaderActive] = React.useState<boolean>(false)
    const [alert, setAlert] = React.useState<string>('')

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