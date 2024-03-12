"use client"
import React from 'react'
import useNavbar from '@/hooks/useNavbar'

const Index = () => {

    const { leads, total, number, rol } = useNavbar()

  return (
    <div className="navbar w-full justify-end flex fixed top-8 right-8">
        <div className="adviserment bg-auxiliar border-primary border-2 p-2 rounded-lg ">
        <span className='font-semibold text-sm'> Total Leads este mes: &nbsp; </span>
        {rol == 'admin' 
            ? <h1 className='font-bold text-center text-2xl text-primary'> {number?.Total} </h1>
            : <h1 className={`font-bold text-center text-2xl ${leads?.length == total?.cantidadLeads ? 'text-red-500' : 'text-primary'}`}> {`${leads?.length} / ${total?.cantidadLeads || 0}`} </h1>
        }
        </div>
    </div>
  )
}

export default Index