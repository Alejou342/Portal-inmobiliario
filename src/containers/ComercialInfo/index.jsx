"use client"
import React from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/formatPrice'
import CardSection from '@/components/CardSection'
import LinkSection from '@/components/LinkSection'
import './index.css'


const Index = ({ props }) => {

    const router = useRouter()
    const [rol, setRol] = React.useState('')
    const [formData, setFormData] = React.useState({
        Idcomercial:0,
    })

    React.useEffect(() => {
        const response = Cookies.get('ComercialID')
        const userInfo = JSON.parse(Cookies?.get('SessionInfo'))
        setRol(userInfo?.answer[0]?.rol)
        setFormData({...formData, Idcomercial: parseInt(response)})
    }, [])


    return (
        <div className='propertie-card bg-auxiliar relative rounded-lg'>
            <Image src={props?.ImagenC || '/assets/default-house.svg'} alt="foto" width={400} height={400} className="card-image aspect-square rounded-lg mb-2" />
            <div className="flex justify-between px-3">
                {rol !== 'Jazmin' && <Image src="/assets/edit.svg" alt="edit" width={30} height={35} title="Editar" className="icon-edit absolute cursor-pointer" onClick={() => router.push(`/propertie/comercial/edit/${formData.Idcomercial}`)} />}
                <p className="font-bold mx-auto"> {props?.NombreC.substr(0,40).toUpperCase()} </p>
                <div className="is-available">
                    {props?.EstadoC == "Disponible" 
                    ? <Image src="/assets/green-circle.svg" alt="available" width={25} height={25} /> 
                    : <Image src="/assets/red-circle.svg" alt="unavailable" width={25} height={25} />}
                </div>      
            </div>
            <div className="comercial-information p-2">
                <CardSection route={"/assets/cards/area.svg"} title="Area Construida" value={`${props?.AreaC}  m²`} />
                <CardSection route={"/assets/cards/city.svg"} title="Ciudad" value={props?.CiudadC} />
                <CardSection route={"/assets/cards/neighbor.svg"} title="Barrio" value={props?.BarrioC || 'No Aplica'} />
                <CardSection route={"/assets/cards/age.svg"} title="Año de construcción" value={props?.Ano_ConstruccionC} />
                <CardSection route={"/assets/cards/price.svg"} title={`${props?.Tipo_ServicioC == 'Comprar' ? 'Precio de venta' : 'Canon de arrendamiento' }`} value={formatPrice(props?.PrecioC)} />
                <LinkSection route={"/assets/cards/link.svg"} title="Enlace del inmueble" link={props?.EnlaceC || ''} />
            </div>
        </div>
    )
}

export default Index