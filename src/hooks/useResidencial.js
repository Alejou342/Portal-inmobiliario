"use client"
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useResidencial = () => {

    const [alert, setAlert] = React.useState(null)
    const [loaderActive, setLoaderActive] = React.useState(false)
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
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            setFormData({...formData, ["Idinmobiliaria"]: Number(sessionInfo?.answer[0]?.ID_Inmobiliaria)})
        } catch (error) {
            console.error(error)
        }
    }, [])


    const uploadImage = () => { 
        const clientId = process.env.IMGUR_ID;
        const apiUrl = process.env.IMGUR_LINK;
        const imageInput = document.getElementById('Imagen');
        const imageFile = imageInput.files[0];
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
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            const formDataNumerico = {
                ...formData,
                Areaconstruida: parseInt(formData.Areaconstruida),
                Habitaciones: parseInt(formData.Habitaciones),
                Baños: parseInt(formData.Baños),
                Parqueaderos: parseInt(formData.Parqueaderos),
                Anoconstruccion: parseInt(formData.Anoconstruccion),
                Precio: parseInt(formData.Precio),
                Arealote: parseInt(formData.Arealote),
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