import { useState } from "react";

const useLoading = (value:boolean):[boolean, (value:boolean) => void] => {
    const [isLoading, setIsLoading] = useState(value)
    const handleIsLoading = (value:boolean) => setIsLoading(value)
    return [isLoading, handleIsLoading]
}

export default useLoading
