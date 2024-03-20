"use client"
import React from 'react'
import { getDate } from '@/utils'
import AlertIcon from '@/components/AlertIcon'
import LimitLeads from '@/components/LimitLeads'
import ModalGeneral from '@/containers/ModalGeneral'

const Index: React.FC = () => {

  const [isHover, setIsHover] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  return (
    <>
      {openModal && 
      <ModalGeneral state={openModal} setState={setOpenModal} className='p-4'>
        <LimitLeads setState={setOpenModal} />
      </ModalGeneral>}
      {getDate() <= 2 
      ? <AlertIcon 
        icon="warning" 
        isHover={isHover} 
        setIsHover={setIsHover} 
        setOpenModal={setOpenModal} 
        text="¡Definir límite mensual de Leads!" 
        className= {{i: "cursor-pointer bottom-[10%]", p: "text-black right-[5%] bottom-[10%]"}} />
      : <AlertIcon 
        icon="warning-red" 
        isHover={isHover} 
        setIsHover={setIsHover} 
        setOpenModal={() => {}} 
        text="¡Solo puedes definir el límite de Leads el día 1 y 2 de cada mes!" 
        className={{i: "cursor-not-allowed bottom-[10%]", p: "text-red-500 right-[5%] bottom-[10%]"}} />}
    </>
  )
}

export default Index