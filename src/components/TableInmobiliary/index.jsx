"use client"
import React from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { getDate } from '@/utils/getDate'
import useInmobiliary from '@/hooks/useInmobiliary'

const Index = () => {

    const { inmobiliarias, loaderActive, sendEmail } = useInmobiliary()

  return (
    <div className="bg-primary max-w-5xl overflow-auto max-h-[80vh] py-1 rounded-md">
        <Loader active={loaderActive} />
        <h1 className="text-center mb-4 text-3xl font-bold text-auxiliar"> Inmobiliarias asociadas </h1>
        <table className="table table-hover bg-auxiliar">
            <thead className='bg-secondary text-white'>
                <tr>        
                    <th className='border px-2 font-bold'> ID Inmobiliaria </th>                    
                    <th className='border px-2 font-bold'> Nombre Inmobiliaria </th>
                    <th className='border px-2 font-bold'> Celular </th>                                              
                    <th className='border px-2 font-bold'> Encargado </th>                                                                                       
                </tr>
            </thead>
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
        <div className="bg-primary text-white rounded-md justify-between px-8 items-center my-1 flex">
            <p>Total inmobiliarias: {inmobiliarias.length}</p>
            {getDate() == 1 ? <Image src="/assets/send.svg"  alt="send.svg" height={30} width={30} title="Enviar resúmen mensual"
            className='bg-auxiliar rounded-full p-1 cursor-pointer' 
            onClick= {() => sendEmail('alejandro.auribe1@gmail.com', 
            'Resumen facturación mes de Febrero', 
            inmobiliarias
            .filter(inmobiliaria => inmobiliaria.rol !== 'admin')
            .map(inmobiliaria => `${inmobiliaria.Nombre_Inmobiliaria}: ${inmobiliaria.totalMes} Leads \n`).join(''))}
            />: null }
        </div>
    </div>  
  )
}

export default Index