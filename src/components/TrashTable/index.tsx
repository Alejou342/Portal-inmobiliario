import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Loader from '@/components/Loader'
import useTables from '@/hooks/useTables'
import { TrashTableTypes } from '@/interfaces'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import SearchSection from '@/components/SearchSection'

const Index = () => {

    const { page, setPage, data, loaderActive, search, setSearch} = useTables('deletes')

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 m-2 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Papelera de reciclaje</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Código', 'Tipo Inmueble', 'Persona', 'Enlace']} />
            <tbody>
                {data?.filter((inmueble: TrashTableTypes) => inmueble.CodigoInmobiliaria?.includes(search))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble: TrashTableTypes, id: number) => 
                <tr key={id + 1} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble?.CodigoInmobiliaria}</td>
                    <td className='border px-2 text-center cursor-pointer'>{inmueble?.Tipo}</td>
                    <td className='border px-2 text-center'>{inmueble?.Personaencargada}</td>    
                    <td className='border px-2 text-center w-[5%]'>
                        <Link href={inmueble?.Enlace} target='blank'>
                            <Image src='/assets/link.svg' alt='link.svg' width={15} height={15} className='mx-auto' />
                        </Link>
                    </td>
                </tr>)}    
            </tbody>          
        </table>
        <TableFooter 
            param={data?.filter((inmueble: TrashTableTypes) => inmueble.CodigoInmobiliaria?.includes(search))} 
            text="Total propiedades eliminadas:" 
            page={page} 
            setPage={setPage} 
            number={20}
        />
    </div>  
  )
}

export default Index