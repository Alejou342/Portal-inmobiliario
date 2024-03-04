import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'
import useGET from '@/hooks/useGET'
import Loader from '@/components/Loader'

const Index = ({ setState, id }) => {

    const { data, loading, error } = useGET(`${process.env.BACK_LINK}/api/comercialById/${id}`)

    const handleDelete = (id) => {
        try {
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            axios.post(`${process.env.BACK_LINK}/api/deleteComercial/${id}`, { Personaencargada: sessionInfo?.answer[0]?.Personaencargada }, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo?.token}`
                }
            })
            .then(() => {
                setState(false)
                location.reload()
            })
            .catch((error) => { 
                console.error(error) 
                setState(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='Gray flex flex-col min-w-fit min-h-fit items-center p-6 pb-10'>
            <Loader active={loading} />
            <div className='items-center flex flex-col p-6 pb-0 pt-0 text-center'>
                {data && <p>¿Estás seguro de que deseas eliminar el inmueble: <br /> <span className="font-bold">  {data[0]?.NombreC} </span> ? </p>}
                {error && <p> Ocurrió algo inesperado... </p>}
            </div>
            <div className="mt-8 flex gap-6">
                <button className="rounded-full bg-slate-400 px-4 py-2 text-white font-bold" onClick={() => setState(false)}>CANCELAR</button>
                <button className="rounded-full bg-primary px-4 py-2 text-white font-bold" onClick={() => handleDelete(id)}>CONFIRMAR</button>
            </div>
        </div>
    )
}

export default Index