import React from 'react'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton';

const upsert = () => {
  const router = useRouter()

  return (
    <>
      <ComeBackButton />
      <div>upsert widget { router.query.id }</div>
    </>
  )
}

export default upsert