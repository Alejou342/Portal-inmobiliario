import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useItem } from '@/context'

const useSidebar = () => {

    const router = useRouter()
    const styles = ['bg-secondary hover:bg-auxiliar hover:text-secondary', 'bg-white hover:bg-auxiliar !text-black']
    const [user, setUser] = React.useState()
    const { item, setItem } = useItem() 

    React.useEffect(() => {
      try {
        const userLogged = JSON.parse(Cookies?.get('SessionInfo'))

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

    const handleChange = (id) => {
      router.push('/main')
      setItem(id)
    }

  return {
    styles,
    user,
    item,
    handleLogout,
    handleChange,
  }
}

export default useSidebar