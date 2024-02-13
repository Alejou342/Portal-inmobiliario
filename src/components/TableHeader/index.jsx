import React from 'react'

const index = ({ columns }) => {
  return (
    <thead className='bg-secondary text-white h-10'>
        <tr>        
            {columns.map(column => <th key={column} className='border text-sm px-2 font-bold'> {column} </th>)}                                                                 
        </tr>
    </thead>
  )
}

export default index