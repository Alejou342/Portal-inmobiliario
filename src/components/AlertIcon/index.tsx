import React from 'react'
import Image from 'next/image'

interface ComponentProps {
    icon: string,
    isHover: boolean,
    setIsHover: any,
    setOpenModal: any,
    text: string,
    className: {
        i: string,
        p: string
    }
}

const index: React.FC<ComponentProps> = ({icon, isHover, setIsHover, setOpenModal, text, className}) => {
    return (
        <div className='flex'>
            {isHover && 
            <p className={`border text-sm border-primary absolute p-2 rounded-lg bg-auxiliar ${className?.p}`}> {text} </p>}
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