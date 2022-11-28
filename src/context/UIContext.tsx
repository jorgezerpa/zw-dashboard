import React, { useContext, createContext, PropsWithChildren } from "react";
import useUIState from "../hooks/useUIState";
import UIContextDefault from "../contextDefaults.ts/UIContext";
import { useRouter } from "next/router";

const Context = createContext(UIContextDefault)

const UIContextProvider = ({children}:PropsWithChildren) => {
    const { error, isLoading, setError, setIsLoading } = useUIState(true)
    const router = useRouter()

    const handleNavigate = (path:string)=> {
        setIsLoading(true)
        router.push(path)
    }
    
    return(
        <Context.Provider value={{error, isLoading, setError, setIsLoading, handleNavigate}}>
            { children }
        </Context.Provider>
    )
}

const useUIContext = () => {
    const context = useContext(Context)
    return context
}

export {Context, UIContextProvider, useUIContext}
