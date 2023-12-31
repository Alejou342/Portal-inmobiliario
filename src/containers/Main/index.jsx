"use client"
import React from 'react'
import Form from '@/containers/Form'
import Sidebar from '@/components/Sidebar'
import LeadTable from '@/components/LeadTable'
import { useItem } from '@/context/ItemContext'
import TableComercial from '@/components/TableComercial'
import TableResidencial from '@/components/TableResidencial'

const Index = () => {

  const { item } = useItem()

  if (item == 1) {
    return (
      <div className='flex'>
          <Sidebar />
          <div className="mx-auto my-4">
              <TableResidencial /> 
          </div>
      </div>
    )
  } else if (item == 2) {
    return (
      <div className='flex'>
          <Sidebar />
          <div className="mx-auto my-4">
              <TableComercial /> 
          </div>
      </div>
    )
  } else if (item == 3) {
    return (
      <div className='flex'>
          <Sidebar />
          <div className="mx-auto my-4">
              <LeadTable /> 
          </div>
      </div>
    )
  } else {
    return (
      <div className='flex'>
          <Sidebar />
          <div className="mx-auto my-4">
              <Form /> 
          </div>
      </div>
    )
  }
}

export default Index