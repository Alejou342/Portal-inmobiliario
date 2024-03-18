/*
  Contexto de la aplicación: Sirve para almacenar el item, la función actualizadora del item y la información de la session:
    * item: Se refiere a la sección del Navbar que esté activa en determinado momento
    * setItem: Se refiere a la función actualizadora del item
    * sessionInfo: Se refiere a la información del usuario activo en la aplicación
*/

"use client"
import React from 'react'
import Cookies from 'js-cookie'
import { ItemContextProps, ItemContextType } from '@/interfaces';

const ItemContext = React.createContext<ItemContextType>({
  item: 0,
  setItem: () => {},
  sessionInfo: null
});


const ItemProvider: React.FC<ItemContextProps> = ({children}) => {

    const [item, setItem] = React.useState(1)
    const [sessionInfo, setSessionInfo] = React.useState(null)

    React.useEffect(() => {
      try {
        const cookie = JSON.parse(Cookies?.get('SessionInfo') || '{}')
        setSessionInfo(cookie)
      } catch (error) {
        console.error(error)
      }
    }, [])

  return (
    <ItemContext.Provider value={{item, setItem, sessionInfo}}>
        {children}
    </ItemContext.Provider>
  )
}

export default ItemProvider

export const useItem = () => {
    return React.useContext(ItemContext);
  };