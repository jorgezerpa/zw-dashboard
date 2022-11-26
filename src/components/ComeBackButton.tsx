import React from 'react'
import { useRouter } from 'next/router'

export const ComeBackButton = () => {
    const router = useRouter()
    const handleComeBack = () => router.back()
  
    return (
    <div onClick={handleComeBack}>
        <p>volver</p>
    </div>
  )
}
