import React from 'react'
import Image from 'next/image'
import Loader from '@/components/Loader'
import TableHeader from '@/components/TableHeader'
import TableFooter from '@/components/TableFooter'
import ModalGeneral from '@/containers/ModalGeneral'
import SearchSection from '@/components/SearchSection'
import ObservationForm from '@/components/ObservationForm'
import useTables from '@/hooks/useTables'

const Index = () => {

    const {
        id, rol, page, data, search, 
        openModal, loaderActive, setPage, 
        setSearch, handleObservation, 
        setOpenModal, availableStatus
    } = useTables('leadsC')

  return (
    <>
        { openModal && 
        <ModalGeneral state={openModal} setState={setOpenModal} className='p-4'>
            <ObservationForm setState={setOpenModal} id={id} letter="C" type="comercial" />
        </ModalGeneral>}
        <div className="bg-primary w-[70rem] overflow-auto py-1 rounded-md">
            <Loader active={loaderActive} />
            <div className="flex justify-between my-2 w-4/5 mx-auto items-center">
                <h1 className="text-center text-3xl font-bold text-auxiliar">Mis Leads Comerciales</h1>
                <SearchSection search={search} setSearch={setSearch} setPage={setPage} />
            </div>
            <table className="table table-hover bg-auxiliar w-full">
                {rol !== 'admin' 
                ? <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Nombre Cliente', 'Teléfono Cliente', 'Fecha de generación', 'Hora de generación', 'Estado', 'Observacion']} />
                : <TableHeader columns={['#', 'Código', 'Nombre Inmueble', 'Nombre Cliente', 'Teléfono Cliente', 'Fecha de generación', 'Hora de generación']} />}
                <tbody>
                    {data?.filter(lead => lead?.CodigoInmobiliaria?.includes(search))
                    .slice(page * 20, page * 20 + 20)
                    .map((lead, id) => 
                    <tr key={id + 1} className="cursor-pointer hover:bg-slate-300" onClick={() => handleObservation(lead?.Idlead)}>
                        <td className='border px-2 text-center'>{id + 1}</td>
                        <td className='border px-2 text-center'>{lead?.CodigoInmobiliaria}</td>
                        <td className='border px-2 text-center'>{lead?.NombreC?.substring(0,25)}</td>
                        <td className='border px-2 text-center'>{lead?.Nombrecliente.substr(0,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Numerocliente.substr(2,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Fechalead.substr(0,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Fechalead.substr(11,5)}</td>
                        {rol !== 'admin' ? 
                        <>
                            <td className='flex justify-center'>
                                <Image src={`/assets/status/${availableStatus[lead?.revisado]}.png`} title={availableStatus[lead?.revisado]} alt="Status" width={20} height={20} />
                            </td>
                            <td className='border px-2 text-center text-xs' title={lead?.Observacion}>
                                {(lead?.Observacion?.length > 16) ? lead?.Observacion?.substr(0,16).concat('...') : lead?.Observacion}
                            </td>
                        </> : null}
                    </tr>)}           
                </tbody>          
            </table>
            <TableFooter 
            param={data?.filter(lead => lead?.CodigoInmobiliaria?.includes(search))} 
            text="Total Leads Comerciales este mes:" 
            page={page} 
            setPage={setPage}
            number={20}
            />
        </div>  
    </>
  )
}

export default Index