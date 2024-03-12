"use client"
import React from 'react'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { formatPrice } from '@/utils'
import useProperties from '@/hooks/useProperties'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import ModalGeneral from '@/containers/ModalGeneral'
import { TableResidencialProps } from '@/interfaces'
import SearchSection from '@/components/SearchSection'
import ResidencialContent from '@/components/ResidencialContent'

const Index = () => {

    const {
        id, rol, page, search, setPage, setSearch, openModal, inmuebles, 
        loaderActive, handleDelete, handleNavigate, setOpenModal
    } = useProperties('residencial')

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <ModalGeneral state={openModal} setState={setOpenModal}>
            <ResidencialContent setState={setOpenModal} id={parseInt(id)} />
        </ModalGeneral>
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Propiedades Residenciales</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            {rol == 'Otros' 
            ? <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Tipo Negocio', 'Precio Inmueble', 'Estado']} />
            : <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Tipo Negocio', 'Precio Inmueble', 'Estado', 'Editar', 'Eliminar']} />}
            <tbody>
                {inmuebles
                .filter((inmueble: { CodigoInmobiliaria: string }) => inmueble.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble: TableResidencialProps, id: number) => 
                <tr key={inmueble.ID_Residencial} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>{inmueble?.NombreR?.substring(0,35)}</td>
                    <td className='border px-2 text-center'>{inmueble.Tipo_ServicioR}</td>
                    <td className='border px-2 text-center'>{formatPrice(inmueble.PrecioR)}</td>
                    <td className='border px-2'>
                        {inmueble.EstadoR == "Disponible" 
                        ? <Image src="/assets/green-circle.svg" alt="green.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" /> 
                        : <Image src="/assets/red-circle.svg" alt="red.svg" title={inmueble.EstadoR} width={18} height={18} className="mx-auto cursor-pointer" />}
                    </td>
                    {rol !== 'Otros' ?
                    <>
                        <td className='border px-2 text-center cursor-pointer' onClick={() => handleNavigate(`/propertie/residencial/edit/${inmueble.ID_Residencial}`, inmueble.ID_Residencial)}>
                            <Image src="/assets/edit.svg" alt="edit.svg" width={20} height={20} className="mx-auto" />
                        </td> 
                        <td className='border px-2 text-center cursor-pointer' onClick={() => handleDelete(inmueble.ID_Residencial)}>
                            <Image src="/assets/delete.svg" alt="delete.svg" width={20} height={20} className="mx-auto" />
                        </td>
                    </> : null}
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
            param={inmuebles.filter((inmueble: { CodigoInmobiliaria: string }) => inmueble.CodigoInmobiliaria?.includes(search))} 
            text="Total Propiedades Residenciales:" 
            page={page} 
            setPage={setPage} 
            number={20}
        />
    </div>  
  )
}

export default Index