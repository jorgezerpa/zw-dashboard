import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { uploadAsset } from '../../services/zwAPI'
import { useUIContext } from '../../context/UIContext'
import { useRouter } from 'next/router'

const upload = () => {
    const context = useUIContext()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [uploaded, setUploaded] = useState(false)

    useEffect(() => {
        context.setIsLoading(false)
    }, [])
    

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        try {
            if(formRef.current){
                const data = new FormData(formRef.current)
                const result = await uploadAsset(data)
                context.setIsLoading(false)
                setUploaded(true)
            }
        } catch (error) {
            context.setIsLoading(false)
            context.setError(true)
        }
    }

    const handleOnChange = () => {
        if(uploaded)setUploaded(false)
    }

    return (
    <div>
        <form ref={formRef} method='POST' onChange={handleOnChange} onSubmit={handleSubmit} encType="multipart/form-data" className='mt-5'>
            <div className='mb-2 '>
                <input type="text" name="identifier" placeholder='identificador' />
            </div>
            <div className='mb-2 '>
                <input type="text" name="name" placeholder='nombre' />
            </div>
            <div className='mb-2 '>
                <input type="file" name="asset" />
            </div>
            <button type='submit' >subir</button>
        </form>
        { context.isLoading && 'uplodeando...' }
        { uploaded && (
            <>
                <div onClick={()=>{context.setIsLoading(true); router.back()}}>volver</div>
                <div>subido</div>
            </>
        )}
    </div>
  )
}

export default upload