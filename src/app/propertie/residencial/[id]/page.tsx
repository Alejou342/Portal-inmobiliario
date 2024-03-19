/*
  Página para observar una propiedad residencial
    * Esta página consume el hook de useGET para manejar las peticiones implicadas, y utiliza esta información para renderizar
    * Posee el manejo de errores 
    * Posee el estado de carga mientras se completa la petición
*/

"use client"
import React from 'react'
import useGET from '@/hooks/useGET'
import Loader from '@/components/Loader'
import Sidebar from '@/components/Sidebar'
import { ResidencialIdProps } from '@/interfaces'
import ResidencialInfo from '@/containers/ResidencialInfo'

const Page: React.FC<ResidencialIdProps> = ({ params }) => {

  const { data, loading, error } = useGET(`${process.env.BACK_LINK}/api/residenciaById/${params.id}`)

  return (
    <div className='flex'>
      <Loader active={loading} />
      <Sidebar />
      <div className="mx-auto my-20 max-w-[30rem]">
        {data && <ResidencialInfo props={data[0]} />}
        {error && <p> Algo salió mal... </p>}
      </div>
    </div>
  )
}

export default Page