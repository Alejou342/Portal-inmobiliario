/* 
    Hook que maneja la información y la lógica para editar una propiedad residencial: 
        * Consta de un formulario que trae la información actual del inmueble con inputs de tipo select, text y file 
        para completar la información de un inmueble tipo residencial
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
import { UseEditResidencialProps, FormEditDataPropsR } from '@/interfaces'

const useEditResidencial = (): UseEditResidencialProps => {

    const router = useRouter()
    const [alert, setAlert] = React.useState<string>('')
    const [residencialId, setResidencialId] = React.useState<string>('')
    const [formData, setFormData] = React.useState<FormEditDataPropsR>({
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
        Unidadcerrada: "",
        Anoconstruccion: 0,
        Enlace: "",
        Precio: 0,
        Arealote: 0,
        Imagen: ""
    });

    React.useEffect(() => {
        try {
            const residencialId = Cookies.get('ResidencialID') || ''
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
            setResidencialId(residencialId)
    
            axios.get(`${process.env.BACK_LINK}/api/residenciaById/${residencialId}`, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then((result) => {
                setFormData({
                    Tiporesidencia: result?.data[0]?.TipoR,
                    Tiposervicio: result?.data[0]?.Tipo_ServicioR,
                    CodigoInmobiliaria: result?.data[0]?.CodigoInmobiliaria,
                    Ciudad: result?.data[0]?.CiudadR,
                    Estado: result?.data[0]?.EstadoR,
                    Nombre: result?.data[0]?.NombreR,
                    Barrio: result?.data[0]?.BarrioR,
                    Areaconstruida: result?.data[0]?.Area_ConstruidaR,
                    Anoconstruccion: result?.data[0]?.Ano_ConstruccionR,
                    Habitaciones: result?.data[0]?.HabitacionR,
                    Baños: result?.data[0]?.BanosR,
                    Parqueaderos: result?.data[0]?.ParqueaderosR,
                    Enlace: result?.data[0]?.EnlaceR,
                    Precio: result?.data[0]?.PrecioR,
                    Arealote: result?.data[0]?.Area_Lote,
                    Imagen: result?.data[0]?.ImagenR,
                    Unidadcerrada: result?.data[0]?.Unidad_CerradaR
                })
            })
                .catch((error) => { 
                console.error(error) 
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

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
            }
            
            axios.put(`${process.env.BACK_LINK}/api/updateResidencial/${residencialId}`, formDataNumerico, {
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
        setAlert,
        formData, 
        setFormData,
        uploadImage,
        handleInputChange,
        handleSubmit
    }
}

export default useEditResidencial