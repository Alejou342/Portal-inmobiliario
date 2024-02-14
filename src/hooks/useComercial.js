"use client"
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useComercial = () => {

    const [alert, setAlert] = React.useState(null)
    const [loaderActive, setLoaderActive] = React.useState(false)
    const [formData, setFormData] = React.useState({
        Idinmobiliaria: 0,
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
            const sessionInfo = JSON.parse(Cookies.get('SessionInfo'))
            setFormData({...formData, ["Idinmobiliaria"]: Number(sessionInfo?.answer[0]?.ID_Inmobiliaria)})
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };

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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const sessionInfo = JSON.parse(Cookies.get('SessionInfo'))
            const formDataNumerico = {
                ...formData,
                Areaconstruida: parseInt(formData.Areaconstruida),
                Anoconstruccion: parseInt(formData.Anoconstruccion),
                Precio: parseInt(formData.Precio),
                Arealote: parseInt(formData.Arealote),
            }
                
            axios.post(`${process.env.BACK_LINK}/api/addComercial`, formDataNumerico, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo.accesToken}`
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
        formData,
        setAlert,
        setFormData,
        handleInputChange,
        uploadImage,
        handleSubmit
    }
}

export default useComercial