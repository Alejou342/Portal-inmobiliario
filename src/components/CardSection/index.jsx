import React from 'react'
import Image from 'next/image'

const Index = ({ route, value, title }) => {
  return (
    <div className="p-2" title={title}>
      <Image src={route} alt="icon.svg" width={20} height={20} className='mx-auto cursor-pointer' />
      <p className='text-sm text-center mt-2 cursor-pointer'>{value}</p>
    </div>
  )
}

export default Index