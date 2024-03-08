"use client"
import React from 'react'
import Image from 'next/image'
import { getDate } from '@/utils'
import Loader from '@/components/Loader'
import TableHeader from '@/components/TableHeader'
import useInmobiliary from '@/hooks/useInmobiliary'

const Index = () => {

    const { data, loading, error, sendEmail } = useInmobiliary(`${process.env.BACK_LINK}/api/getI`)

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loading} />
        <h1 className="text-center mb-4 text-3xl font-bold text-auxiliar"> Inmobiliarias asociadas </h1>
        {data && <table className="table table-hover w-full bg-auxiliar">
            <TableHeader columns={['ID Inmobiliaria','Nombre Inmobiliaria','Celular','Encargado']}/>
            <tbody className='h-[33.75rem]'>
                {data?.filter(inmobiliaria => inmobiliaria.rol !== 'admin')
                .map(inmobiliaria => 
                <tr key={inmobiliaria.ID_Inmobiliaria} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{inmobiliaria.ID_Inmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer'>{inmobiliaria.Nombre_Inmobiliaria}</td>
                    <td className='border px-2 text-center'>{inmobiliaria.Celular}</td>
                    <td className='border px-2 text-center'>{inmobiliaria.Personaencargada}</td>
                </tr>)}           
            </tbody>          
        </table>}
        {error && <p className='text-center'> Ocurrió un error inesperado</p>}
        <div className="bg-primary text-white rounded-md justify-between px-16 py-2 items-center flex">
            <p className='font-bold'>Total inmobiliarias: {data?.length - 1}</p>
            {getDate() <= 2 &&
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>  &nbsp; Enviar resumen de leads </p>
                    <Image src="/assets/send.svg"  alt="send.svg" height={30} width={30} title="Enviar resúmen mensual"
                    className='bg-auxiliar rounded-full p-1 cursor-pointer' 
                    onClick= {() => sendEmail('lina.otalvaro@capitalpocket.app', 
                    'Resumen facturación de este mes', 
                    data?.filter(inmobiliaria => inmobiliaria.rol !== 'admin')
                    .map(inmobiliaria => `${inmobiliaria.Nombre_Inmobiliaria}: ${inmobiliaria.Totalmes} Leads \n`).join(''))}/> 
                </div> 
            }
        </div>
    </div>
  )
}

export default Index