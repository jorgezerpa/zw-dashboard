import React from 'react'
import { Sidebar } from '../commons/Sidebar'
import type { PropsWithChildren } from 'react'
import { useUIContext } from '../context/UIContext'
import { ErrorModal } from '../components/ErrorModal'

export const MainLayout = ({ children }:PropsWithChildren) => {
  const context = useUIContext()

  return (
    <div className='w-full flex overflow-y-hidden'>
        <Sidebar />
        <div className='h-screen w-full overflow-y-scroll'>
            { children }
        </div>
        { context.error && <ErrorModal /> }
    </div>
  )
}
