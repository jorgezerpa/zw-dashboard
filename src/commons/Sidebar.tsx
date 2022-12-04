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
    <div className='relative w-[120px] h-screen flex flex-col items-center justify-center gap-8 border bg-gray-100'>
              <div className='absolute top-0 right-0 bottom-0 w-[1px] bg-gray-300'></div>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-blue-800 flex justify-center items-center shadow-md hover:shadow-lg hover:shadow-black shadow-black'>
                      Home
                </div>
              </Link>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/programs`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-blue-800 flex justify-center items-center shadow-md hover:shadow-lg hover:shadow-black shadow-black'>
                      Programs
                </div>
              </Link>
              <Link onClick={handleOnClick} className='text-white font-bold text-center' href={`/media`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-blue-800 flex justify-center items-center shadow-md hover:shadow-lg hover:shadow-black shadow-black'>
                      media
                </div>
              </Link>
    </div>
  )
}
