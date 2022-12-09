import React from 'react'
import Link from 'next/link'
import { useUIContext } from '../context/UIContext'
import { useRouter } from 'next/router'
import { useAuth0 } from '@auth0/auth0-react'

export const Sidebar = () => {
  const context = useUIContext()
  const router = useRouter()
  const { logout } = useAuth0()

  const handleOnClick = () => {
    context.setIsLoading(true)
  }

  return (
    <div className={`${router.pathname==='/login' && 'hidden'} relative w-[120px] h-screen flex flex-col items-center justify-center gap-8 border bg-gray-100`}>
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
              <div onClick={()=>logout({returnTo:process.env.NEXT_PUBLIC_ZW_API_REDIRECT_URI as string })}>logout</div>
    </div>
  )
}
