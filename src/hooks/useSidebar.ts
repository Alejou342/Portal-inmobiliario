import React from 'react'
import Cookies from 'js-cookie'
import { useItem } from '@/context'
import { useRouter } from 'next/navigation'

const useSidebar = () => {

    const router = useRouter()
    const [user, setUser] = React.useState<any>()
    const { item, setItem } = useItem() 

    React.useEffect(() => {
      try {
        const userLogged = JSON.parse(Cookies?.get('SessionInfo') || '{}')

        if (userLogged) {
          setUser(userLogged?.answer[0])
        }
      } catch (error) {
        console.error(error)
      }
    }, [])

    const handleLogout = () => {
      Cookies.remove('SessionInfo')
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }

    const handleChange = (id: number) => {
      router.push('/main')
      setItem(id)
    }

  return {
    user,
    item,
    handleLogout,
    handleChange,
  }
}

export default useSidebar