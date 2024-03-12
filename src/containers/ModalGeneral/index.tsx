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