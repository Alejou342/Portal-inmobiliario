import React from 'react'
import Image from 'next/image'
import Loader from '@/components/Loader'
import useTables from '@/hooks/useTables'
import TableHeader from '@/components/TableHeader'
import TableFooter from '@/components/TableFooter'
import ModalGeneral from '@/containers/ModalGeneral'
import SearchSection from '@/components/SearchSection'
import ObservationForm from '@/components/ObservationForm'

interface LeadProps {
    CodigoInmobiliaria: string
    NombreC: string
    Nombrecliente: string
    Numerocliente: string
    Fechalead: string
    Observacion: string
    revisado: number
    Idlead: number
}

const Index = () => {

    const {
        id, rol, page, data, search, openModal, loaderActive, setPage, 
        setSearch, handleObservation, setOpenModal, availableStatus
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
                    {data
                    .filter((lead: { revisado: number }) => rol == 'Otros' ? lead.revisado == 2 : lead)
                    .filter((lead: { CodigoInmobiliaria: string }) => lead?.CodigoInmobiliaria?.includes(search))
                    .sort((a: {Fechalead: string}, b: {Fechalead: string}) => (a.Fechalead < b.Fechalead) ? 1 : ((b.Fechalead < a.Fechalead) ? -1 : 0))
                    .slice(page * 20, page * 20 + 20)
                    .map((lead: LeadProps, id: number) => 
                    <tr key={id + 1} className="cursor-pointer hover:bg-slate-300 border" onClick={() => handleObservation(lead?.Idlead)}>
                        <td className='border px-2 text-center'>{id + 1}</td>
                        <td className='border px-2 text-center'>{lead?.CodigoInmobiliaria}</td>
                        <td className='border px-2 text-center'>{lead?.NombreC?.substring(0,25)}</td>
                        <td className='border px-2 text-center'>{lead?.Nombrecliente.substr(0,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Numerocliente.substr(2,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Fechalead.substr(0,10)}</td>
                        <td className='border px-2 text-center'>{lead?.Fechalead.substr(11,5)}</td>
                        {rol !== 'admin' ? 
                        <>
                            <td>
                                <Image src={`/assets/status/${availableStatus[lead?.revisado]}.svg`} className='mx-auto' title={availableStatus[lead?.revisado]} alt="Status" width={20} height={20} />
                            </td>
                            <td className='border px-2 text-center text-xs' title={lead?.Observacion}>
                                {(lead?.Observacion?.length > 16) ? lead?.Observacion?.substr(0,16).concat('...') : lead?.Observacion}
                            </td>
                        </> : null}
                    </tr>)}           
                </tbody>          
            </table>
            <TableFooter param={data && 
            data?.filter((lead: { CodigoInmobiliaria: string }) => lead?.CodigoInmobiliaria?.includes(search))
            .filter((lead: { revisado: number }) => rol == 'Otros' ? lead.revisado == 2 : lead)} 
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