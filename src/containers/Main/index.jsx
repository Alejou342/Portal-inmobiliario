"use client"
import './index.css'
import React from 'react'
import Cookies from 'js-cookie'
import Form from '@/containers/Form'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import LeadTable from '@/components/LeadTable'
import { useItem } from '@/context/ItemContext'
import TraceTable from '@/components/TraceTable'
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
      const userLogged = JSON.parse(Cookies.get('SessionInfo'))

      if (userLogged) {
        setUser(userLogged?.answer[0])
        setRol(userLogged?.answer[0]?.rol)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const views = [
    { key: 'Comercial', component: <TableComercial key="Comercial" />},
    { key: 'Residencial', component: <TableResidencial key="Residencial" />},
    { key: 'Lead', component: <LeadTable key="Lead" />},
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
        {rol == 'admin' ? null : <LimitButton />}
      </div>
    )
}

export default Index