"use client"
import axios from 'axios'
import React from 'react'
import Loader from '@/components/Loader'
import Sidebar from '@/components/Sidebar'
import ResidencialInfo from '@/containers/ResidencialInfo'
import Cookies from 'js-cookie'

const Page = ({ params }) => {

  const [values, setValues] = React.useState(null)
  const [loaderActive, setLoaderActive] = React.useState(false)

  React.useEffect(() => {
    try {
      setLoaderActive(true)
      const sessionInfo = JSON.parse(Cookies?.get('SessionInfo'))
      axios.get(`${process.env.BACK_LINK}/api/residenciaById/${params.id}`, {
          headers: {
              "Authorization": `Bearer ${sessionInfo?.token}`
          }
      })
      .then((result) => {
        setValues(result.data[0])
        setLoaderActive(false)
      })
      .catch((error) => { 
        console.error(error) 
        setLoaderActive(false)
      })
    } catch (error) {
        console.error(error)
    }
  }, [])

  return (
    <div className='flex'>
      <Loader active={loaderActive} />
      <Sidebar />
      <div className="mx-auto my-20">
        <ResidencialInfo props={values} />
      </div>
    </div>
  )
}

export default Page