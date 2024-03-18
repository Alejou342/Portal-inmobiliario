/*
  Hook utilizado para la manejar los eventos del Sidebar izquierdo de la aplicación, permite cambio de estilos, mostrar información y Logout
    * router: Utiliza useRouter para realizar la navegación en el evento de Logout
    * user: Almacena la información del usuario y la consume desde la Cookie de SessionInfo, asignada cuando un usuario de Logea
    * item: Es un número que sirve para indicar cual elemento del sidebar está activo para renderizar la información correcta
    * setItem: Permite actualizar el valor del item y renderizar la información correcta tal como se muestre en el Sidebar
    * handleLogout: Permite el deslogeo de la aplicación al eliminar la Cookie de SessionInfo y haciendo la navegación a la ruta "/"
    * handleChange: Modifica el item de manera global, redirecciona a "/main" y permite mostrar la información que se señala en la Sidebar
*/

import React from 'react'
import Cookies from 'js-cookie'
import { useItem } from '@/context'
import { User } from '@/interfaces'
import { useRouter } from 'next/navigation'

const useSidebar = () => {

    const router = useRouter()
    const [user, setUser] = React.useState<User>()
    const { item, setItem } = useItem() 

    React.useEffect(() => {
      try {
        const userLogged = JSON.parse(Cookies?.get('SessionInfo') || '{}')

        if (userLogged) {
          setUser(userLogged?.answer[0])
        }
      } catch (error) {
        console.error(error)
      }
    }, [])

    const handleLogout = () => {
      Cookies.remove('SessionInfo')
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }

    const handleChange = (id: number) => {
      router.push('/main')
      setItem(id)
    }

  return {
    user,
    item,
    handleLogout,
    handleChange,
  }
}

export default useSidebar