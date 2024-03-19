/*
    Página para editar una propiedad de tipo comercial
        * Esta página solo es visible si las personas están autenticadas con un rol diferente a 'Otros'
        * Si la persona tiene rol = 'Otros' Será redirigido automáticamente a la ruta /main
*/

'use client'
import React from 'react'
import EditComercial from '@/components/EditComercial'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const Page: React.FC = () => {

    const router = useRouter()
    const [rol, setRol] = React.useState<string | null>('')

    React.useEffect(() => {
        const sessionInfo = JSON.parse(Cookies?.get('SessionInfo') || '{}')
        setRol(sessionInfo?.answer[0]?.rol)

        if (rol === 'Otros') {
            router.push('/main')
        }
    }, [rol])


    return (
        <div className='flex items-center'>
            <Sidebar />
            <div className="mx-auto my-4 form-section p-4 bg-auxiliar rounded-lg border-2 border-primary max-h-[70vh]"> 
                <h1 className="text-primary text-center text-3xl font-bold"> Editar inmueble </h1>
                <EditComercial />   
            </div>
        </div>
    )
}

export default Page