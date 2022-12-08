import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth0 } from "@auth0/auth0-react"

export default function useAuth(){
  const auth = useAuth0()
  const router = useRouter()

  return {
    ...auth,
    handleLogin:()=>{
      useEffect(() => {
        if(!auth.isLoading){
          auth.isAuthenticated ? '' : router.push('/login')    
        }
      }, [auth.isLoading])
    }    
  }

}