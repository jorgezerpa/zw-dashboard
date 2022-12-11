import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const { loginWithRedirect } = useAuth0()
    const { isAuthenticated, isLoading } = useAuth0()
    const router = useRouter()

    useEffect(() => {
      if(!isLoading){
        !isAuthenticated ? '' : router.push('/')    
      }
    }, [isLoading])


  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='max-w-[300px]'>
        <p className='text-center pt-20 mb-3 text-md font-semibold'>
          If you want to access the project, use the credentials in the description of the <a className='text-blue-900 font-bold' target='_blank' href="https://github.com/jorgezerpa/zw-dashboard">GitHub</a> repository.
        </p>
        <div onClick={loginWithRedirect} className=" text-center py-3 bg-blue-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-black">Login</div>
      </div>

    </div>
  )
}

export default Login