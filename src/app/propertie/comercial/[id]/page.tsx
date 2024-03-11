"use client"
import React from 'react'
import useGET from '@/hooks/useGET'
import Loader from '@/components/Loader'
import Sidebar from '@/components/Sidebar'
import ComercialInfo from '@/containers/ComercialInfo'

interface PageProps {
  params: {
    id: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {

  const { data, loading, error } = useGET(`${process.env.BACK_LINK}/api/comercialById/${params.id}`)

    return (
      <div className='flex'>
        <Loader active={loading} />
        <Sidebar />
        <div className="mx-auto my-20 max-w-[30rem]">
          {data && <ComercialInfo props={data[0]} />}
          {error && <p> Algo salió mal... </p>}
        </div>
      </div>
    )
  }

export default Page