"use client"
import React from 'react'
import axios from 'axios'

const useComercial = () => {

    const [alert, setAlert] = React.useState(null)
    const [formData, setFormData] = React.useState({
        Idinmobiliaria: 0,
        Tiporesidencia: "",
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
        const actualId = localStorage.getItem('User')
        setFormData({...formData, ["Idinmobiliaria"]: Number(JSON.parse(actualId).Idinmobiliaria)})
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
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const formDataNumerico = {
            ...formData,
            Areaconstruida: parseInt(formData.Areaconstruida),
            Anoconstruccion: parseInt(formData.Anoconstruccion),
            Precio: parseInt(formData.Precio),
            Arealote: parseInt(formData.Arealote),
        }

        console.log('Datos a enviar:', formDataNumerico)
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

export default useComercial