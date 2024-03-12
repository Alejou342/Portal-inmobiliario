import React from 'react'
import Image from 'next/image'
import { TableFooterProps } from '@/interfaces'

const index: React.FC<TableFooterProps> = ({ param, text, page, setPage, number }) => {

    const handlePreview = () => {
        return page > 0 ? setPage(page - 1) : null
    }

    const handleNext = () => {
        return page * number < param?.length - number ? setPage(page + 1) : null
    }

    return (
        <div className="bg-primary flex justify-between px-4 py-2 text-white rounded-md text-center my-1">
            <Image 
            src="/assets/arrow.svg" 
            alt="left-arrow.svg" 
            width={20} 
            height={20} 
            className="rotate-180 cursor-pointer aspect-square" 
            onClick={handlePreview} 
            title="Página Anterior" />
                <b> {text} &nbsp; {`${page* number} / ${param?.length}`} </b>
            <Image 
            src="/assets/arrow.svg" 
            alt="right-arrow.svg" 
            width={20} 
            height={20} 
            className="cursor-pointer aspect-square" 
            onClick={handleNext} 
            title="Página Siguiente" />
        </div>
    )
}

export default index