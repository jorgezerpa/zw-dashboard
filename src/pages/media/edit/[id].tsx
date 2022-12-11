import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { updateAsset, getAsset, deleteAsset } from '../../../services/zwAPI'
import { useUIContext } from '../../../context/UIContext'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton'
import { SuccessForm } from '../../../components/SuccessForm'
import useAuth from '../../../hooks/useAuth'

type AssetType = {id: number|string, path:string, identifier:string, name:string}

const update = () => {
    const context = useUIContext()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [uploaded, setUploaded] = useState(false)
    const [asset, setAsset] = useState<Partial<AssetType>>({})
    const { handleLogin, token } = useAuth()
    handleLogin()


    useEffect(() => {
        (async()=>{
            if(token){

                try {
                    if(typeof router.query.id==='string'){
                        let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
                        if(router.query.type==='images') type='image'
                        if(router.query.type==='videos') type='video'
                        if(router.query.type==='files') type='file'
                        const result = await getAsset(router.query.id, type, token)
                        setAsset(result)
                        context.setIsLoading(false)
                    }
                } catch (error) {
                    context.setIsLoading(false)
                    context.setError(false)
                }
            }
        })()
    }, [router, token])

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        try {
            if(formRef.current && token){
                const data = new FormData(formRef.current)
                if(typeof router.query.id==='string'){
                let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
                if(router.query.type==='images') type='image'
                if(router.query.type==='videos') type='video'
                if(router.query.type==='files') type='file'
                const result = await updateAsset(router.query.id, type, data, token)
                context.setIsLoading(false)
                setUploaded(true)
                }
            }
        } catch (error) {
            context.setIsLoading(false)
            context.setError(true)
        }
    }

    const handleDelete = async() => {
        context.setIsLoading(true)
        try {
          if(asset.id && token){
            let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
            if(router.query.type==='images') type='image'
            if(router.query.type==='videos') type='video'
            if(router.query.type==='files') type='file'
            const result = await deleteAsset(asset.id as string, type, token)
            router.back()
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
        <h2 className='text-4xl font-bold mb-5 pl-5'>update asset</h2>
        <form ref={formRef} method='POST' onChange={handleOnChange} onSubmit={handleSubmit} encType="multipart/form-data" className='mt-5 pl-5'>
            <div className='mb-2 '>
                <input defaultValue={asset.identifier} type="text" name="identifier" placeholder='identifier' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='mb-2 '>
                <input defaultValue={asset.name} type="text" name="name" placeholder='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='mb-2 '>
                <input type="file" name="asset" />
            </div>
            <button type='submit' className="mr-5 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >subir</button>
            <button onClick={()=> handleDelete()} className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >delete</button>
        </form>
        { context.isLoading && <div className='mt-2'>...updating</div> }
        { uploaded && (
            <>
                <SuccessForm message='asset successfully updated!' />
            </>
        )}
    </div>
  )
}

export default update