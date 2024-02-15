import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader'

const Index = ({ setState }) => {

    const [id, setId] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [loaderActive, setLoaderActive] = React.useState(false)

    React.useEffect(() => {
        try {
            setLoaderActive(true)
            const id = Cookies.get('ResidencialID')
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            setId(id)
            axios.get(`${process.env.BACK_LINK}/api/residenciaById/${id}`, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo.accesToken}`
                }
            })
            .then((result) => {
                setName(result.data[0]?.NombreR)
                setLoaderActive(false)
            })
            .catch((error) => { 
                console.error(error) 
                setLoaderActive(false)
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const handleDelete = (id) => {
        try {
            setLoaderActive(true)
            const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
            axios.post(`${process.env.BACK_LINK}/api/deleteResidencial/${id}`, { Personaencargada: sessionInfo?.answer[0]?.Personaencargada }, {
                headers: {
                    "Authorization": `Bearer ${sessionInfo.accesToken}`
                }
            })
            .then((result) => {
                setState(false)
                setLoaderActive(false)
                location.reload()
            })
            .catch((error) => { 
                console.error(error) 
                setState(false)
                setLoaderActive(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='Gray flex flex-col min-w-fit min-h-fit items-center p-6 pb-10'>
            <Loader active={loaderActive} />
            <div className='items-center flex flex-col p-6 pb-0 pt-0 text-center'>
                <p>¿Estás seguro de que deseas eliminar el inmueble: <br /> <span className="font-bold">  {name} </span> ? </p>
            </div>
            <div className="mt-8 flex gap-6">
                <button className="rounded-full bg-slate-400 px-4 py-2 text-white font-bold" onClick={() => setState(false)}>CANCELAR</button>
                <button className="rounded-full bg-primary px-4 py-2 text-white font-bold" onClick={() => handleDelete(id)}>CONFIRMAR</button>
            </div>
        </div>
    )
}

export default Index