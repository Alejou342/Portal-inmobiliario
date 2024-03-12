"use client"
import './index.css'
import React from 'react'
import useMain from '@/hooks/useMain'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import TrashButton from '@/components/TrashButton'
import LimitButton from '@/components/LimitButton'

const Index: React.FC = () => {

  const { views, item, rol } = useMain()

    return (
      <div>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <div className="table-container mx-auto my-4">
            {views && views[item - 1]?.component}
          </div>
        </div>
        <div className="flex">
        {(rol == 'admin' || rol == 'user') ? <TrashButton /> : null}
        {(rol == 'admin' || rol == 'Otros' || rol == 'Asesor') ? null : <LimitButton />}
        </div>
      </div>
    )
}

export default Index