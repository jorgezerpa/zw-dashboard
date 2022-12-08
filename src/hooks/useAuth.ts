import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth0 } from "@auth0/auth0-react"

export default function useAuth(){
  const auth = useAuth0()
  const router = useRouter()
  const [token, setToken] = useState<null|string>(null)

  return {
    ...auth,
    token,
    handleLogin:()=>{
      useEffect(() => {
        (async()=>{
          if(!auth.isLoading){
            const accessToken = await auth.getAccessTokenSilently({audience:'https://zerpasw.zerpacode.com/api', scope:'admin'})
            setToken(accessToken)
            auth.isAuthenticated ? '' : router.push('/login')    
          }

        })()
      }, [auth.isLoading])
    }    
  }

}