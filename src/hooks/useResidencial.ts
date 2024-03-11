"use client"
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface FormDataProps {
    Idinmobiliaria: number
    Tiporesidencia: string
    CodigoInmobiliaria: string
    Tiposervicio: string
    Estado: string
    Nombre: string
    Areaconstruida: number
    Habitaciones: number
    Baños: number
    Parqueaderos: number
    Ciudad: string
    Barrio: string
    Unidadcerrada: string
    Anoconstruccion: number
    Enlace: string
    Precio: number
    Arealote: number
    Imagen: string
}

interface UseResidencialProps {
    alert: string
    loaderActive: boolean
    formData: FormDataProps
    setAlert: React.Dispatch<React.SetStateAction<string>>
    setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>
    uploadImage: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)  => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const useResidencial = (): UseResidencialProps => {

    const [alert, setAlert] = React.useState<string>('')
    const [loaderActive, setLoaderActive] = React.useState<boolean>(false)
    const [formData, setFormData] = React.useState({
        Idinmobiliaria: 0,
        Tiporesidencia: "",
        CodigoInmobiliaria: "",
        Tiposervicio: "",
        Estado: "",
        Nombre: "",
        Areaconstruida: 0,
        Habitaciones: 0,
        Baños: 0,
        Parqueaderos: 0,
        Ciudad: "",
        Barrio: "",
        Unidadcerrada: "No",
        Anoconstruccion: 0,
        Enlace: "",
        Precio: 0,
        Arealote: 0,
        Imagen: ""
    });

    React.useEffect(() => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            setFormData({...formData, ["Idinmobiliaria"]: Number(sessionInfo?.answer[0]?.ID_Inmobiliaria)})
        } catch (error) {
            console.error(error)
        }
    }, [])


    const uploadImage = () => { 
        const clientId = process.env.IMGUR_ID;
        const apiUrl = process.env.IMGUR_LINK || '';
        const imageInput = document.getElementById('Imagen') as HTMLInputElement;
        const imageFile = imageInput.files?.[0];
        setLoaderActive(true)
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
                setLoaderActive(false)
            })
            .catch(error => {
                console.error('Error --> ', error)
                setAlert(`Error al subir la imagen`);
                setLoaderActive(false)
            });
        } else {
            setAlert('Selecciona una imagen antes de subirla.');
        }
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            const formDataNumerico = {
                ...formData,
                Areaconstruida: formData.Areaconstruida,
                Habitaciones: formData.Habitaciones,
                Baños: formData.Baños,
                Parqueaderos: formData.Parqueaderos,
                Anoconstruccion: formData.Anoconstruccion,
                Precio: formData.Precio,
                Arealote: formData.Arealote,
            };
            axios.post(`${process.env.BACK_LINK}/api/addResidencia`, formDataNumerico, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then(() => location.reload())
            .catch((error) => console.error(error))
        } catch (error) {
            console.error(error)
        }
    };

    return {
        alert,
        loaderActive,
        setAlert,
        formData, 
        setFormData,
        uploadImage,
        handleInputChange,
        handleSubmit
    }
}

export default useResidencial