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
              if(auth.isAuthenticated){
                  const accessToken = await auth.getAccessTokenSilently({audience:process.env.NEXT_PUBLIC_ZW_API_AUDIENCE as string, scope:'admin'})
                  setToken(accessToken)
              } else {
                  router.push('/login')    
              }
          }
        })()
      }, [auth.isLoading])
    }    
  }

}