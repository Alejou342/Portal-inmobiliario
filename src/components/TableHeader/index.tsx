import React from 'react'
import { TableHeaderProps } from '@/interfaces'

const index: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className='bg-secondary text-white h-10'>
        <tr>        
            {columns.map((column: string) => <th key={column} className='border text-sm px-2 font-bold'> {column} </th>)}                                                                 
        </tr>
    </thead>
  )
}

export default index