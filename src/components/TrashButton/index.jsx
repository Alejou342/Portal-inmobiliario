"use client"
import React from 'react'
import AlertIcon from '@/components/AlertIcon'
import TrashTable from '@/components/TrashTable'
import ModalGeneral from '@/containers/ModalGeneral'

const Index = () => {

  const [isHover, setIsHover] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)

  return (
    <>
        {openModal && 
        <ModalGeneral state={openModal} setState={setOpenModal} className='p-4'>
            <TrashTable />
        </ModalGeneral>}
        <AlertIcon 
        icon="delete" 
        isHover={isHover} 
        setIsHover={setIsHover} 
        setOpenModal={setOpenModal} 
        text="Papelera de reciclaje" 
        className= {{i: "cursor-pointer", p: "text-black right-[5%] bottom-9"}} />
    </>
  )
}
export default Index