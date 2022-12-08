import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const { loginWithRedirect } = useAuth0()
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
    const router = useRouter()

    useEffect(() => {
      if(!isLoading){
        !isAuthenticated ? '' : router.push('/')    
      }
    }, [isLoading])


  return (
    <div onClick={loginWithRedirect}>Login</div>
  )
}

export default Login