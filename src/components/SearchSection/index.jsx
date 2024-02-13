import React from 'react'
import Image from 'next/image'
import './index.css'

const index = ({ search, setSearch, setPage }) => {

  const handleChange = (e) => {
    setSearch(e.target.value)
    setPage(0)
  }

  return (
    <div className="searcher relative">
        <input id='search' type='number' value={search} placeholder='Buscar por código' onChange={(e) => handleChange(e)} className='no-spinners h-8 rounded-lg px-2' />
        <Image src="/assets/search.svg" alt="search.svg" width={30} height={30} className='cursor-pointer absolute bottom-0 top-0 right-2 my-auto placeholder:text-lg' />
    </div>
  )
}

export default index