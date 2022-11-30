import React from 'react'
import Link from 'next/link'
import { useUIContext } from '../context/UIContext'

const items = ['', 'programs']

export const Sidebar = () => {
  const context = useUIContext()
  
  const handleOnClick = () => {
    context.setIsLoading(true)
  }

  return (
    <div className='w-[120px] h-screen flex flex-col items-center justify-center gap-8'>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      Home
                </div>
              </Link>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/programs`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      Programs
                </div>
              </Link>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/media`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      media
                </div>
              </Link>
    </div>
  )
}
