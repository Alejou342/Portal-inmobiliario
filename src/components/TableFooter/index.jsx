import React from 'react'
import Image from 'next/image'

const index = ({ param, text, page, setPage }) => {

    const handlePreview = () => {
        return page > 0 ? setPage(page - 1) : null
    }

    const handleNext = () => {
        return page * 20 < param?.length - 20 ? setPage(page + 1) : null
    }

    return (
        <div className="bg-primary flex justify-between px-4 text-white rounded-md text-center my-1">
            <Image 
            src="/assets/arrow.svg" 
            alt="left-arrow.svg" 
            width={20} 
            height={20} 
            className="rotate-180 cursor-pointer" 
            onClick={handlePreview} 
            title="Página Anterior" />
                <b> {text} &nbsp; {`${page* 20} / ${param?.length}`} </b>
            <Image 
            src="/assets/arrow.svg" 
            alt="right-arrow.svg" 
            width={20} 
            height={20} 
            className="cursor-pointer" 
            onClick={handleNext} 
            title="Página Siguiente" />
        </div>
    )
}

export default index