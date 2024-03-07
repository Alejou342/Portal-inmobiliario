"use client"
import React from 'react'
import Cookies from 'js-cookie'

const ItemContext = React.createContext();

const ItemProvider = ({children}) => {

    const [item, setItem] = React.useState(1)
    const [sessionInfo, setSessionInfo] = React.useState(null)

    React.useEffect(() => {
      try {
        const cookie = JSON.parse(Cookies?.get('SessionInfo'))
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