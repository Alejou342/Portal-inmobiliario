"use client"
import React from 'react'
import Main from '@/containers/Main'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


const Page: React.FC = () => {

  const router = useRouter()

  React.useEffect(() => {
    try {
      const userLogged = Cookies.get('SessionInfo')
      if (!userLogged) {
        router.push('/')
      }
    } catch (error) {
        console.error(error)
    }
  }, [])

  return (
    <Main />
  )
}

export default Page