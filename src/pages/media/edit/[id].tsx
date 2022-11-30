import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { updateAsset, getAsset, deleteAsset } from '../../../services/zwAPI'
import { useUIContext } from '../../../context/UIContext'
import { useRouter } from 'next/router'

type AssetType = {id: number|string, path:string, identifier:string, name:string}

const update = () => {
    const context = useUIContext()
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [uploaded, setUploaded] = useState(false)
    const [asset, setAsset] = useState<Partial<AssetType>>({})

    useEffect(() => {
        (async()=>{
            try {
                if(typeof router.query.id==='string'){
                    let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
                    if(router.query.type==='images') type='image'
                    if(router.query.type==='videos') type='video'
                    if(router.query.type==='files') type='file'
                    const result = await getAsset(router.query.id, type)
                    setAsset(result)
                    context.setIsLoading(false)
                }
            } catch (error) {
                context.setIsLoading(false)
                context.setError(false)
            }
        })()
    }, [router])

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        try {
            if(formRef.current){
                const data = new FormData(formRef.current)
                if(typeof router.query.id==='string'){
                let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
                if(router.query.type==='images') type='image'
                if(router.query.type==='videos') type='video'
                if(router.query.type==='files') type='file'
                const result = await updateAsset(router.query.id, type, data)
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
          if(asset.id){
            let type: "image" | "video" | "file" = 'image' //by default to satisfy ts, but yes or yes have to be setted
            if(router.query.type==='images') type='image'
            if(router.query.type==='videos') type='video'
            if(router.query.type==='files') type='file'
            const result = await deleteAsset(asset.id as string, type)
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
    <div>
        <form ref={formRef} method='POST' onChange={handleOnChange} onSubmit={handleSubmit} encType="multipart/form-data" className='mt-5'>
            <div className='mb-2 '>
                <input defaultValue={asset.identifier} type="text" name="identifier" placeholder='identificador' />
            </div>
            <div className='mb-2 '>
                <input defaultValue={asset.name} type="text" name="name" placeholder='nombre' />
            </div>
            <div className='mb-2 '>
                <input type="file" name="asset" />
            </div>
            <button type='submit' >subir</button>
            <div onClick={()=> handleDelete()} >delete</div>
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

export default update