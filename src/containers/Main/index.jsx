"use client"
import './index.css'
import React from 'react'
import Cookies from 'js-cookie'
import Form from '@/containers/Form'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import LeadRTable from '@/components/LeadRTable'
import LeadCTable from '@/components/LeadCTable'
import { useItem } from '@/context/ItemContext'
import TraceTable from '@/components/TraceTable'
import TrashButton from '@/components/TrashButton'
import LimitButton from '@/components/LimitButton'
import TableComercial from '@/components/TableComercial'
import TableInmobiliary from '@/components/TableInmobiliary'
import TableResidencial from '@/components/TableResidencial'

const Index = () => {

  const { item } = useItem()
  const [user, setUser] = React.useState()
  const [rol, setRol] = React.useState()
  
  React.useEffect(() => {
    try {
      const userLogged = JSON.parse(Cookies?.get('SessionInfo'))

      if (userLogged) {
        setUser(userLogged?.answer[0])
        setRol(userLogged?.answer[0]?.rol)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const views = [
    { key: 'Residencial', component: <TableResidencial key="Residencial" />},
    { key: 'Comercial', component: <TableComercial key="Comercial" />},
    { key: 'LeadC', component: <LeadCTable key="LeadC" />},
    { key: 'LeadR', component: <LeadRTable key="LeadR" />},
    { key: 'Form', component: user?.rol == 'admin' ?  <TableInmobiliary key="Inmobiliary" /> : <Form key="Form" />},
    { key: 'Trace', component: <TraceTable /> },
  ]

    return (
      <div>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className="table-container mx-auto my-4">
            {views[item - 1]?.component}
          </div>
        </div>
        <div className="flex">
        {(rol == 'admin' || rol == 'user') ? <TrashButton /> : null}
        {rol == 'admin' ? null : <LimitButton />}
        </div>
      </div>
    )
}

export default Index