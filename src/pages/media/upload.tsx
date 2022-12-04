import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { uploadAsset } from '../../services/zwAPI'
import { useUIContext } from '../../context/UIContext'
import { useRouter } from 'next/router'
import { SuccessForm } from '../../components/SuccessForm'
import { ComeBackButton } from '../../components/ComeBackButton'

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
    <div className='m-5'>
        <ComeBackButton />
        <h2 className='text-4xl font-bold mb-5 pl-5'>Crear Asset</h2>
        <form className="ml-5" ref={formRef} method='POST' onChange={handleOnChange} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='mb-2 '>
                <input type="text" name="identifier" placeholder='identificador' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='mb-2 '>
                <input type="text" name="name" placeholder='nombre' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='mb-2 '>
                <input type="file" name="asset" />
            </div>
            <button type='submit' className="mr-5 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">subir</button>
        </form>
        { context.isLoading && <div className='mt-2'>...subiendo</div> }
        { uploaded && (<SuccessForm message='¡nuevo asset subido exitosamente!'/>)}
    </div>
  )
}

export default upload