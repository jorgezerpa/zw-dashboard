import React from 'react'
import { useRouter } from 'next/router'

const titleDefault = "Ups! parece que hubo un error."
const messageDefault = "Lamentamos las Molestias. Recarga la página he intenta de nuevo."

export const ErrorModal = ({title=titleDefault, message=messageDefault}:{title?:string, message?:string}) => {
  const router = useRouter()

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)]'>
        <div className='p-5 bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <h4 className='font-bold text-2xl text-center mb-2'>{title}</h4>
          <p className='text-center mb-4'>{message}</p>
          <div className='w-full flex justify-center'>
            <button className='py-2 px-4 bg-blue-800 font-bold text-lg text-white rounded-lg' onClick={()=>router.reload()}>Recargar</button>
          </div>
        </div>
    </div>
  )
}
