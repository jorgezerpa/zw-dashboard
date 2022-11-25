import React from 'react'
import Link from 'next/link'

const items = ['', 'programs']

export const Sidebar = () => {
  return (
    <div className='w-[120px] h-screen flex flex-col items-center justify-center gap-8'>
            <div className='w-[90px] h-[90px] rounded-lg bg-gray-500 flex justify-center items-center'>
              <Link className='text-white font-bold text-center' href={`/`}>
                  Home
              </Link>
            </div>
            <div className='w-[90px] h-[90px] rounded-lg bg-gray-500 flex justify-center items-center'>
              <Link className='text-white font-bold text-center' href={`/programs`}>
                  Programs
              </Link>
            </div>
            <div className='w-[90px] h-[90px] rounded-lg bg-gray-500 flex justify-center items-center'>
              <Link className='text-white font-bold text-center' href={`/media`}>
                  media
              </Link>
            </div>
    </div>
  )
}
