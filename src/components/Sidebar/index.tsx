"use client"
import React from 'react'
import Button from '@/components/Button'
import UserInfo from '@/components/UserInfo'
import useSidebar from '@/hooks/useSidebar'
import SideHeader from '@/components/SideHeader'

const Index = () => {

  const styles = ['bg-secondary hover:bg-auxiliar hover:text-secondary', 'bg-white hover:bg-auxiliar !text-black']
  const { user, item, handleChange, handleLogout } = useSidebar()

  return (
    <aside className="bg-primary w-1/6 h-screen relative py-12 rounded-r-[4rem]">
      <SideHeader to="/main" />
      <div className="buttons gap-8 flex flex-col">
        <Button 
          onClick={() => handleChange(1)} 
          type="button" 
          className={`text-xs ${item == 1 ? styles[0] : styles[1]}`} 
        >
          Propiedades residenciales
        </Button>
        <Button 
          onClick={() => handleChange(2)} 
          type="button" 
          className={`text-xs ${item == 2 ? styles[0] : styles[1]}`} 
          >
          Propiedades comerciales 
        </Button>
        <Button 
          onClick={() => handleChange(3)} 
          type="button" 
          className={`text-xs ${item == 3 ? styles[0] : styles[1]}`} 
        >
          Leads residenciales
        </Button>
        <Button 
          onClick={() => handleChange(4)} 
          type="button" 
          className={`text-xs ${item == 4 ? styles[0] : styles[1]}`} 
        >
          Leads comerciales
        </Button>
        {user?.rol !== 'Otros' && <Button 
          onClick={() => handleChange(5)} 
          type="button" 
          className={`text-xs ${item == 5 ? styles[0] : styles[1]}`} 
        >
          {user?.rol == 'admin' ? 'Inmobiliarias' : 'Añadir propiedad'} 
        </Button>}
        {(user?.rol == 'admin' || user?.rol == 'user') && <Button 
          onClick={() => handleChange(6)} 
          type="button" 
          className={`text-xs ${item == 6 ? styles[0] : styles[1]}`} 
        >
          Huella
        </Button>}
      </div>
      <UserInfo props = {{ user, handleLogout }} />
    </aside>
  )
}

export default Index
