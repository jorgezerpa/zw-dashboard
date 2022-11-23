import React from 'react'
import { Sidebar } from '../commons/Sidebar'
import type { PropsWithChildren } from 'react'

export const MainLayout = ({ children }:PropsWithChildren) => {
  return (
    <div className='w-full flex overflow-y-hidden'>
        <Sidebar />
        <div className='h-screen'>
            { children }
        </div>
    </div>
  )
}
