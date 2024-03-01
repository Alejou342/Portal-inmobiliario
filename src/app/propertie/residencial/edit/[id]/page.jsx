'use client'
import React from 'react'
import Cookies from 'js-cookie'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import EditResidencial from '@/components/EditResidencial'

const Page = () => {

    const router = useRouter()
    const [rol, setRol] = React.useState('')

    React.useEffect(() => {
        const userInfo = JSON.parse(Cookies?.get('SessionInfo'))
        setRol(userInfo?.answer[0]?.rol)

        if (rol === 'Jazmin') {
            router.push('/main')
        }
    }, [rol])

    return (
        <div className='flex items-center'>
            <Sidebar />
            <div className="mx-auto my-4 form-section p-4 bg-auxiliar rounded-lg border-2 border-primary max-h-[80vh]">
                <h1 className="text-primary text-center text-3xl font-bold"> Editar inmueble </h1>
                <EditResidencial />
            </div>
        </div>
    )
}

export default Page