/*
  Este contenedor es el principal de nuestra aplicación renderiza ciertos componentes ubicados en diferentes lugares para dar una experiecia, consume a useMain 
    * views: Contiene los componentes que se renderizan según los roles del usuario
    * item: Contiene la información del item que actualmente está activo, para dar una buena experiencia al usuario
    * rol: Un valor proveniente de la Cookie SessionInfo, y que otorga diferentes permisos a los usuarios de la aplicación
*/

"use client"
import './index.css'
import React from 'react'
import useMain from '@/hooks/useMain'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import TrashButton from '@/components/TrashButton'
import LimitButton from '@/components/LimitButton'

const Index: React.FC = () => {

  const { views, item, rol } = useMain()

    return (
      <div>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className="table-container mx-auto my-4">
            {views && views[item - 1]?.component}
          </div>
        </div>
        <div className="flex">
        {(rol == 'admin' || rol == 'user') ? <TrashButton /> : null}
        {(rol == 'admin' || rol == 'Otros' || rol == 'Asesor') ? null : <LimitButton />}
        </div>
      </div>
    )
}

export default Index