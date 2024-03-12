import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SideHeaderProps } from '@/interfaces'

const Index: React.FC<SideHeaderProps> = ({ to }) => {
  return (
    <div className='mx-auto bg-white w-2/3 rounded-[4rem] rounded-ee-none py-2 mb-8'>
        <Link href={to}>
            <Image src="/Pocki.svg" alt="pocki.svg" width={120} height={120} className='mx-auto w-[8rem]' priority={true} />
        </Link>
        <p className='text-center text-xs text-primary font-bold'> Inmobiliario </p>
    </div>
  )
}

export default Index