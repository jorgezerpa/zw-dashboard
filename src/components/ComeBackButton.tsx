import React from 'react'
import { useRouter } from 'next/router'

export const ComeBackButton = ({ path }: { path:string }) => {
    const router = useRouter()
    const handleComeBack = () => router.push(path)
  
    return (
    <div onClick={handleComeBack}>
        <p>volver</p>
    </div>
  )
}
