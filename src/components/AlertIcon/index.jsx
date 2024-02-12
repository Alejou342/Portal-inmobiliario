import React from 'react'
import Image from 'next/image'

const  index = ({icon, isHover, setIsHover, setOpenModal, text, className}) => {
    return (
        <div className='flex'>
            {isHover && 
            <p className={`border text-sm border-primary absolute right-[5%] bottom-9 p-2 rounded-lg bg-auxiliar ${className?.p}`}> {text} </p>}
            <Image 
            src={`/assets/${icon}.svg`} 
            alt="limit-modal.svg" 
            width={50} 
            height={50} 
            className={`absolute bottom-8 right-8 ${className?.i}`}
            onClick={() => setOpenModal(true)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            />
        </div>
    )
}

export default index