import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogin = () => {

    const router = useRouter()
    const [loaderActive, setLoaderActive] = React.useState(false)
    const [alert, setAlert] = React.useState('')

    const [formData, setFormData] = React.useState({
        Correo: '',
        Contraseña: '',
    }); 

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };

    const eventLogin = (response) => {
        router.push('/main')
        Cookies.set('SessionInfo', JSON.stringify(response.data))
        setLoaderActive(false)
    }

    const eventLoginFailed = (error) => {
        setLoaderActive(false)
        setAlert(error?.response?.data)
    }

    const onLoginSubmit = (e) => {
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