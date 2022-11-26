import React from 'react'
import Link from 'next/link'

const items = ['', 'programs']

export const Sidebar = () => {
  return (
    <div className='w-[120px] h-screen flex flex-col items-center justify-center gap-8'>
              <Link className='text-white font-bold text-center' href={`/`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      Home
                </div>
              </Link>
              <Link className='text-white font-bold text-center' href={`/programs`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      Programs
                </div>
              </Link>
              <Link className='text-white font-bold text-center' href={`/media`}>
                <div className='w-[90px] h-[90px] rounded-lg bg-[#234fcf] flex justify-center items-center'>
                      media
                </div>
              </Link>
    </div>
  )
}
