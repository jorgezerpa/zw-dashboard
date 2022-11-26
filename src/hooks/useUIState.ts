import { useState } from "react";

interface UIStateValues {
    isLoading: boolean,
    error: boolean,
    setIsLoading: (value:boolean)=>void,
    setError: (value:boolean)=>void,
}

const useUIState = (isLoadingInit:boolean=false ): UIStateValues => {
    const [isLoading, setIsLoading] = useState(isLoadingInit)
    const [error, setError] = useState(false)

    return {
        isLoading,
        setIsLoading,
        error,
        setError
    }
}

export default useUIState 
