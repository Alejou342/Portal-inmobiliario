/*
  Ruta principal de la aplicación cuando un usuario está Logeado
    * Si el usuario NO está Logeado (No encuentra la cookie SessionInfo) el sistema lo redirige a la ruta de login
    * Si el usuario está Logeado (Encuentra la cookie SessionInfo) el sistema muestra la información de los componentes
*/

"use client"
import React from 'react'
import Main from '@/containers/Main'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


const Page: React.FC = () => {

  const router = useRouter()

  React.useEffect(() => {
    try {
      const userLogged = Cookies.get('SessionInfo')
      if (!userLogged) {
        router.push('/')
      }
    } catch (error) {
        console.error(error)
    }
  }, [])

  return (
    <Main />
  )
}

export default Page