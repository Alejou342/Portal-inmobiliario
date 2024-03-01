"use client"
import React from 'react'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { getDate } from '@/utils/getDate'
import TableHeader from '@/components/TableHeader'
import useInmobiliary from '@/hooks/useInmobiliary'

const Index = () => {

    const { inmobiliarias, loaderActive, sendEmail } = useInmobiliary()

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <h1 className="text-center mb-4 text-3xl font-bold text-auxiliar"> Inmobiliarias asociadas </h1>
        <table className="table table-hover w-full bg-auxiliar">
            <TableHeader columns={['ID Inmobiliaria','Nombre Inmobiliaria','Celular','Encargado']}/>
            <tbody>
                {inmobiliarias
                .filter(inmobiliaria => inmobiliaria.rol !== 'admin')
                .map(inmobiliaria => 
                <tr key={inmobiliaria.ID_Inmobiliaria} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{inmobiliaria.ID_Inmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer'>{inmobiliaria.Nombre_Inmobiliaria}</td>
                    <td className='border px-2 text-center'>{inmobiliaria.Celular}</td>
                    <td className='border px-2 text-center'>{inmobiliaria.Personaencargada}</td>
                </tr>)}           
            </tbody>          
        </table>
        <div className="bg-primary text-white rounded-md justify-between px-16 py-2 items-center flex">
            <p className='font-bold'>Total inmobiliarias: {inmobiliarias.length - 1}</p>
            <div className='flex items-center gap-2'>
                    <p className='font-bold'>  &nbsp; Enviar resumen de leads </p>
                    {/* Revisar el tema para enviar email */}
            {getDate() <= 2 
                ? <Image src="/assets/send.svg"  alt="send.svg" height={30} width={30} title="Enviar resúmen mensual"
                className='bg-auxiliar rounded-full p-1 cursor-pointer' 
                onClick= {() => sendEmail('lina.otalvaro@capitalpocket.app', 
                'Resumen facturación de este mes', 
                inmobiliarias
                .filter(inmobiliaria => inmobiliaria.rol !== 'admin')
                .map(inmobiliaria => `${inmobiliaria.Nombre_Inmobiliaria}: ${inmobiliaria.totalMes} Leads \n`).join(''))}/>
                : <Image src="/assets/send.svg"  alt="send.svg" height={30} width={30} title="Disponible solamente los días 1 y 2 de cada mes"
                className='bg-auxiliar rounded-full p-1 cursor-not-allowed' /> }
            </div> 
        </div>
    </div>  
  )
}

export default Index