import React from 'react'
import Loader from '@/components/Loader'
import useTables from '@/hooks/useTables'
import TableFooter from '@/components/TableFooter'
import TableHeader from '@/components/TableHeader'
import SearchSection from '@/components/SearchSection'

const Index = () => {
    
    const { page, setPage, data, loaderActive, search, setSearch } = useTables('traces')

  return (
    <div className="bg-primary w-[60rem] overflow-auto py-1 rounded-md">
        <Loader active={loaderActive} />
        <div className="flex justify-between my-2 px-8 mx-auto items-center">
            <h1 className="text-center text-3xl font-bold text-auxiliar">Registro de ingresos</h1>
            <SearchSection search={search} setSearch={setSearch} setPage={setPage} type='text' placeholder='encargado' />
        </div>
        <table className="table table-hover bg-auxiliar w-full">
            <TableHeader columns={['#', 'Correo', 'Fecha Ingreso', 'Hora Ingreso', 'Encargado']} />
            <tbody className='h-[33.75rem]'>
                {data && data?.filter(inmueble => inmueble.Personaencargada?.toLowerCase().includes(search.toLowerCase()))
                .slice(page * 20, page * 20 + 20)
                .map((inmueble, id) => 
                <tr key={id + 1} className="hover:bg-slate-300">
                    <td className='border px-2 text-center'>{id + 1}</td>
                    <td className='border px-2 text-center'>{inmueble.Correo}</td>
                    <td className='border px-2 text-center'>{inmueble.Fechaingreso.substr(0,10)}</td>
                    <td className='border px-2 text-center'>{inmueble.Fechaingreso.substr(11,5)}</td>
                    <td className='border px-2 text-center'>{inmueble.Personaencargada.substr(0,15)}</td>
                </tr>)}           
            </tbody>          
        </table>
        <TableFooter 
            param={data && data?.filter(inmueble => inmueble.Personaencargada?.toLowerCase().includes(search.toLowerCase()))} 
            text="Total ingresos:" 
            page={page} 
            setPage={setPage} 
            number={20}
        />
    </div>  
  )
}

export default Index