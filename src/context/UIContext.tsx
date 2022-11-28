import React, { useContext, createContext, PropsWithChildren } from "react";
import useUIState from "../hooks/useUIState";
import UIContextDefault from "../contextDefaults.ts/UIContext";

const Context = createContext(UIContextDefault)

const UIContextProvider = ({children}:PropsWithChildren) => {
    const { error, isLoading, setError, setIsLoading } = useUIState(true)
    
    return(
        <Context.Provider value={{error, isLoading, setError, setIsLoading}}>
            { children }
        </Context.Provider>
    )
}

const useUIContext = () => {
    const context = useContext(Context)
    return context
}

export {Context, UIContextProvider, useUIContext}
