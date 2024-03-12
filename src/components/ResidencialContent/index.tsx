import React from 'react'
import Loader from '@/components/Loader'
import useGET from '@/hooks/useGET'
import { handleDeleteR } from '@/utils'
import { ResidencialContentProps } from '@/interfaces'

const Index: React.FC<ResidencialContentProps> = ({ setState, id }) => {

    const { data, loading, error } = useGET(`${process.env.BACK_LINK}/api/residenciaById/${id}`)

    return (
        <div className='Gray flex flex-col min-w-fit min-h-fit items-center p-6 pb-10'>
            <Loader active={loading} />
            <div className='items-center flex flex-col p-6 pb-0 pt-0 text-center'>
                {data && <p>¿Estás seguro de que deseas eliminar el inmueble: <br /> <span className="font-bold">  {data[0]?.NombreR} </span> ? </p>}
                {error && <p> Ocurrió algo inesperado... </p>}
            </div>
            <div className="mt-8 flex gap-6">
                <button className="rounded-full bg-slate-400 px-4 py-2 text-white font-bold" onClick={() => setState(false)}>CANCELAR</button>
                <button className="rounded-full bg-primary px-4 py-2 text-white font-bold" onClick={() => handleDeleteR(setState, id)}>CONFIRMAR</button>
            </div>
        </div>
    )
}

export default Index