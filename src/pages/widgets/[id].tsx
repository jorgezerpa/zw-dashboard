import React from 'react'
import { useRouter } from 'next/router'


const upsert = () => {
  const router = useRouter()

  return (
    <div>upsert widget { router.query.id }</div>
  )
}

export default upsert