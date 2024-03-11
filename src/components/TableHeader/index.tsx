import React from 'react'

interface ComponentProps {
  columns: string[]
}

const index: React.FC<ComponentProps> = ({ columns }) => {
  return (
    <thead className='bg-secondary text-white h-10'>
        <tr>        
            {columns.map((column: string) => <th key={column} className='border text-sm px-2 font-bold'> {column} </th>)}                                                                 
        </tr>
    </thead>
  )
}

export default index