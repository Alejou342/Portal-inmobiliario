"use client"
import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/formatPrice'
import CardSection from '@/components/CardSection'
import LinkSection from '@/components/LinkSection'
import './index.css'


const Index = ({ props }) => {

    const router = useRouter()
    const [alert, setAlert] = React.useState('')
    const [formData, setFormData] = React.useState({
        Idcomercial:0,
        Nombrecliente:"Alejandro Uribe",
        Numerocliente:"3506217627"
    })

    React.useEffect(() => {
        const response = Cookies.get('ComercialID')
        setFormData({...formData, Idcomercial: parseInt(response)})
    }, [])

    const generateLead = async () => {
        return await axios.post(`${process.env.BACK_LINK}/api/addLeadComercial`, formData)
        .then(() => setAlert('¡Lead enviado con éxito!'))
        .catch(() => setAlert('¡Hubo un problema al enviar el Lead!'))
    }

    return (
        <div className='propertie-card bg-auxiliar relative rounded-lg'>
            <Image src={props?.ImagenC || '/assets/default-house.svg'} alt="foto" width={400} height={400} className="card-image aspect-square rounded-lg mb-2" />
            <div className="flex justify-between px-3">
                <Image src="/assets/edit.svg" alt="edit" width={30} height={35} title="Editar" className="icon-edit absolute cursor-pointer" onClick={() => router.push(`/propertie/comercial/edit/${formData.Idcomercial}`)} />
                <p className="font-bold mx-auto"> {props?.NombreC.substr(0,40).toUpperCase()} </p>
                <div className="is-available">
                    {props?.EstadoC == "Disponible" 
                    ? <Image src="/assets/green-circle.svg" alt="available" width={25} height={25} /> 
                    : <Image src="/assets/red-circle.svg" alt="unavailable" width={25} height={25} />}
                </div>      
            </div>
            <div className="comercial-information">
                <CardSection route={"/assets/cards/area.svg"} title="Area Construida" value={`${props?.AreaC}  m²`} />
                <CardSection route={"/assets/cards/city.svg"} title="Ciudad" value={props?.CiudadC} />
                <CardSection route={"/assets/cards/neighbor.svg"} title="Barrio" value={props?.BarrioC || 'No Aplica'} />
                <CardSection route={"/assets/cards/age.svg"} title="Año de construcción" value={props?.Ano_ConstruccionC} />
                <CardSection route={"/assets/cards/price.svg"} title={`${props?.Tipo_ServicioC == 'Comprar' ? 'Precio de venta' : 'Canon de arrendamiento' }`} value={formatPrice(props?.PrecioC)} />
                <LinkSection route={"/assets/cards/link.svg"} title="Enlace del inmueble" link={props?.EnlaceC || ''} />
            </div>
            <Button type="button" onClick={generateLead} className="bg-primary flex justify-center my-4"> Generar Lead </Button>
            {alert.includes('Hubo') 
            ? <p className='text-xs text-red-500 text-center my-4'> {alert} </p>
            : <p className='text-xs text-primary text-center my-4'> {alert} </p>}
        </div>
    )
}

export default Index