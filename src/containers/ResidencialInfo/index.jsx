"use client"
import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/formatPrice'
import LinkSection from '@/components/LinkSection'
import CardSection from '@/components/CardSection'
import './index.css'


const Index = ({ props }) => {

  const router = useRouter()
  const [rol, setRol] = React.useState('')
  const [formData, setFormData] = React.useState({
    Idresidencia:0,
  })

  React.useEffect(() => {
    const response = Cookies.get('ResidencialID')
    const userInfo = JSON.parse(Cookies?.get('SessionInfo'))
    setRol(userInfo?.answer[0]?.rol)
    setFormData({...formData, Idresidencia: parseInt(response)})
  }, [])

  return (
    <div className='propertie-card bg-auxiliar relative rounded-lg'>
      <Image src={props?.ImagenR || '/assets/default-house.svg'} alt="foto" width={400} height={400} className="card-image aspect-square rounded-lg mb-2" />
      <div className="flex justify-between px-3">
        <p className="font-bold mx-auto"> {props?.NombreR.substr(0,40).toUpperCase()} </p>
        {rol !== 'Jazmin' && <Image src="/assets/edit.svg" alt="edit" width={30} height={35} title="Editar" className="icon-edit absolute cursor-pointer" onClick={() => router.push(`/propertie/residencial/edit/${formData.Idresidencia}`)} />}
        <div className="is-available">
          {props?.EstadoR == "Disponible" 
          ? <Image src="/assets/green-circle.svg" alt="available" width={25} height={25} /> 
          : <Image src="/assets/red-circle.svg" alt="unavailable" width={25} height={25} />}
        </div>      
      </div>
      <div className="residencial-information p-2">
        <CardSection route={"/assets/cards/area.svg"} title="Area Construida" value={`${props?.Area_ConstruidaR}  m²`} />
        <CardSection route={"/assets/cards/city.svg"} title="Ciudad" value={props?.CiudadR} />
        <CardSection route={"/assets/cards/neighbor.svg"} title="Barrio" value={props?.BarrioR || 'No Aplica'} />
        <CardSection route={"/assets/cards/beds.svg"} title="Habitaciones" value={`${props?.HabitacionR}`} />
        <CardSection route={"/assets/cards/toilets.svg"} title="Baños" value={`${props?.BanosR}`} />
        <CardSection route={"/assets/cards/parkings.svg"} title="Parqueaderos" value={props?.ParqueaderosR} />
        <CardSection route={"/assets/cards/age.svg"} title="Año de construcción" value={props?.Ano_ConstruccionR} />
        <CardSection route={"/assets/cards/price.svg"} title={`${props?.Tipo_ServicioR == 'Comprar' ? 'Precio de venta' : 'Canon de arrendamiento' }`} value={formatPrice(props?.PrecioR)} />
        <LinkSection route={"/assets/cards/link.svg"} title="Enlace" value="Enlace" link={props?.EnlaceR || ''} />
      </div>
    </div>
  )
}

export default Index