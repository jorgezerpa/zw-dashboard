import React from 'react'
import { useRouter } from 'next/router'
import { useUIContext } from '../context/UIContext'

export const ComeBackButton = () => {
    const { setIsLoading } = useUIContext() 
    const router = useRouter()
    const handleComeBack = () => {
      setIsLoading(true)
      router.back()
    }
  
    return (
    <div onClick={handleComeBack}>
        <p>volver</p>
    </div>
  )
}
