/*
    Este componente se encarga de proveer una plantilla para mostar elementos dentro de un modal
        * children: Muestra la información interna del modal, para un propósito variable y específico
        * state: Es un valor booleano que maneja si el modal es visible o está oculto
        * setState: Función actualizadora del estado
        * className: String que sirve para dar estilos al componente modal
*/

import React from 'react'
import Image from 'next/image'
import { ModalGeneralProps } from '@/interfaces'
import './index.css'

const Index: React.FC<ModalGeneralProps> = ({ children, state, setState, className }) => {

    return (
        <>
            { state &&
                <div className={`modal-general ${className}`}>
                    <main className='relative modal shadow-lg bg-auxiliar p-6'>
                        <button 
                            className='close-modal-icon cursor-pointer'
                            onClick={() => setState(!state)}
                        > 
                            <Image src='/assets/close-icon.svg' width={25} height={25} alt='cerrar' />
                        </button>
                        <div className='h-full w-full px-12'>
                            {children}
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default Index