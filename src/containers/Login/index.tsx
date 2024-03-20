/*
    Este contenedor corresponde a la UI del formulario de Login, utiliza la lógica proveniente de useLogin
        * loaderActive: Es una variable que retorna true cuando una petición está en curso
        * alert: Renderiza un mensaje de alerta en caso de logearse con credenciales incorrectas
        * handleInputChange: Maneja los eventos de escrituras en cada uno de los inputs
        * onLoginSubmit: Maneja el evento de envío del formulario
        * formData: Almacena la información de Logeo
*/

"use client"
import React from 'react';
import useLogin from '@/hooks/useLogin';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import SideHeader from '@/components/SideHeader';
import LoginSection from '@/components/LoginSection'
import PasswordSection from '@/components/PasswordSection';

const Index = () => {

    const { loaderActive, alert, handleInputChange, onLoginSubmit, formData } = useLogin()

  return (
    <form className="flex flex-col gap-4 bg-auxiliar p-6 rounded-lg" onSubmit={onLoginSubmit}>
        <Loader active={loaderActive} />
        <SideHeader to="/" />
        <LoginSection  
            label="Correo electrónico"
            type="text"
            id="Correo"
            placeholder="Correo electrónico"
            onChange={handleInputChange}
            value={formData.Correo}
        />
        <PasswordSection  
            id="Contraseña"
            label="Contraseña"
            placeholder="**********"
            onChange={handleInputChange}
            value={formData.Contraseña}
        />
        <p className='text-xs text-red-500 text-center'> {alert} </p>
        <Button 
            type="submit" 
            className="bg-secondary"
        >
            Ingresar
        </Button>
    </form>
  )
}

export default Index