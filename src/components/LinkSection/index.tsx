import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LinkSectionProps } from '@/interfaces'

const Index: React.FC<LinkSectionProps> = ({ route, link, title }) => {
  return (
    <div className="p-2" title={title}>
      <Link href={link} target='blank'> 
        <Image src={route} alt="icon.svg" width={20} height={20} className='mx-auto cursor-pointer' />
        <p className='text-sm text-center mt-2 cursor-pointe'>Enlace</p>
      </Link>
    </div>
  )
}

export default Index