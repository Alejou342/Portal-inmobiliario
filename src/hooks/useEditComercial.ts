/* 
    Hook que maneja la información y la lógica para editar una propiedad comercial: 
        * Consta de un formulario que trae la información actual del inmueble con inputs de tipo select, text y file 
        para completar la información de un inmueble tipo comercial
        * alert: Es una variable que define un mensaje de éxito o error a la hora de subir la imagen al formulario
        * loaderActive: Es una variable que define el tiempo mientras se completa una petición HTTP
        * formData: Es una variable que almacena la información del formulario
        * handleInputChange: Es una función que actualiza el estado de cualquier campo del formulario
        * uploadImage: Es una función que se encarga de almacenar en la web una imagen de local
        * handleSubmit: Es la función que se encarga de llevar la información del formulario 
*/

"use client"
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { UseEditComercialProps, FormEditDataPropsC } from '@/interfaces'

const useEditComercial = (): UseEditComercialProps => {

    const router = useRouter()
    const [alert, setAlert] = React.useState<string>('')
    const [comercialId, setComercialId] = React.useState<string>('')
    const [formData, setFormData] = React.useState<FormEditDataPropsC>({
        Tipocomercial: "",
        CodigoInmobiliaria: "",
        Tiposervicio: "",
        Estado: "",
        Nombre: "",
        Ciudad: "",
        Barrio: "",
        Areaconstruida: 0,
        Anoconstruccion: 0,
        Enlace: "",
        Precio: 0,
        Arealote: 0,
        Imagen: ""
    });

    React.useEffect(() => {
        try {
            const comercialId = Cookies.get('ComercialID') || ''
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            setComercialId(comercialId)
    
            axios.get(`${process.env.BACK_LINK}/api/comercialById/${comercialId}`, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then((result) => {
                setFormData({
                    Tipocomercial: result?.data[0]?.TipoC,
                    Tiposervicio: result?.data[0]?.Tipo_ServicioC,
                    CodigoInmobiliaria: result?.data[0]?.CodigoInmobiliaria,
                    Ciudad: result?.data[0]?.CiudadC,
                    Estado: result?.data[0]?.EstadoC,
                    Nombre: result?.data[0]?.NombreC,
                    Barrio: result?.data[0]?.BarrioC,
                    Areaconstruida: result?.data[0]?.AreaC,
                    Anoconstruccion: result?.data[0]?.Ano_ConstruccionC,
                    Enlace: result?.data[0]?.EnlaceC,
                    Precio: result?.data[0]?.PrecioC,
                    Arealote: result?.data[0]?.Area_LoteC,
                    Imagen: result?.data[0]?.ImagenC
                })
            })
                .catch((error) => { 
                console.error(error) 
            })
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };

    const uploadImage = () => { 
        const clientId = process.env.IMGUR_ID;
        const apiUrl = process.env.IMGUR_LINK || '';
        const imageInput = document.getElementById('Imagen') as HTMLInputElement;
        const imageFile = imageInput.files?.[0];

        if (imageFile) {
            const imageFormData = new FormData();
            imageFormData.append('image', imageFile);
            axios.post(apiUrl, imageFormData, {
                headers: {
                    Authorization: `Client-ID ${clientId}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                const imageUrl = response.data.data.link;
                setFormData({...formData, ["Imagen"]: imageUrl})
                setAlert(`Imagen subida exitosamente.`);
            })
            .catch(error => {
                console.error('Error --> ', error)
                setAlert(`Error al subir la imagen`);
            });
        } else {
            setAlert('Selecciona una imagen antes de subirla.');
        }
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            const formDataNumerico = {
                ...formData,
                Areaconstruida: formData.Areaconstruida,
                Anoconstruccion: formData.Anoconstruccion,
                Precio: formData.Precio,
                Arealote: formData.Arealote,
            }

            axios.put(`${process.env.BACK_LINK}/api/updateComercial/${comercialId}`, formDataNumerico, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then(() => router.push('/main'))
            .catch((error) => console.error(error))
        } catch (error) {
            console.error(error)
        }
        
    };

    return {
        alert,
        formData,
        setAlert,
        setFormData,
        handleInputChange,
        uploadImage,
        handleSubmit
    }
}

export default useEditComercial