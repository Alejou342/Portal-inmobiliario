/*
  Ruta de Login de la aplicación
    * Si el usuario está Logeado (Encuentra la cookie SessionInfo) el sistema lo redirige a la ruta /main
    * Si el usuario NO está Logeado (No encuentra la cookie SessionInfo) el sistema muestra el formulario de login
*/

"use client"
import React from "react"
import Login from '@/containers/Login'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const Home = () => {
  
  const router = useRouter()
  
  React.useEffect(() => {
    try {
      const userLogged = Cookies.get('SessionInfo')
      if (userLogged) {
        router.push('/main')
      }
    } catch (error) {
        console.error(error)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login />
    </main>
  )
}

export default Home;
