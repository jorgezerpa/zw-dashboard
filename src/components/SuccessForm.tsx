import React, { use } from 'react'
import { useUIContext } from '../context/UIContext';
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router';

export const SuccessForm = ({ message }:{message:string}) => {
    const context = useUIContext()
    const router = useRouter()

    return (
    <>
        <div className='font-bold text-gray-700 mb-2'>{message}</div>
        <div className='font-bold text-gray-900 flex gap-1 items-center' onClick={()=>{context.setIsLoading(true); router.back()}}><BiArrowBack /> come back</div>
    </>
  )
}
