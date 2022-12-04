import React from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '../context/UIContext'
import { IoIosArrowBack } from 'react-icons/io/'

export const ComeBackButton = () => {
    const { setIsLoading } = useUIContext() 
    const router = useRouter()
    const handleComeBack = () => {
      setIsLoading(true)
      router.back()
    }
  
    return (
    <div onClick={handleComeBack} className="ml-3">
        <IoIosArrowBack size={40} color="#44f" />
    </div>
  )
}
