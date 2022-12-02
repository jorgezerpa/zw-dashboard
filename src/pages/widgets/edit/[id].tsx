import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { getWidget, updateWidget } from '../../../services/zwAPI'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton'
import { useUIContext } from '../../../context/UIContext'
import { MediaModal } from '../../../components/mediaModal/MediaModal'
import deleteNullValues from '../../../utils/deleteNullValues'

type WidgetType = {
id?: number, 
title?:string,
description?:string,
image?: {id:number},
video?: {id:number},
file?: {id:number},
}

const create = () => {
  const context = useUIContext()
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [widget, setWidget] = useState<WidgetType>({})
    const [created, setCreated] = useState(false)
    const [showMediaModal, setShowMediaModal] = useState(false)
    const [mediaType, setMediaType] = useState<'images'|'videos'|'files'>('videos')
    const [assetsId, setAssetsId] = useState<{fileId:string|number|null,videoId:string|number|null,imageId:string|number|null}>({
      fileId: null,
      videoId: null,
      imageId: null
    })

    useEffect(()=>{
      (async()=>{
        if(typeof router.query.id === 'string'){
          const result = await getWidget(router.query.id)
          setWidget(result.widget)
          context.setIsLoading(false)
        }
      })()
    }, [router])

    const handleAssetClick = (type:'images'|'videos'|'files') => {
        setShowMediaModal(true)
        setMediaType(type)
    }

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        const assets = deleteNullValues(assetsId)
        console.log(assets)
        try {
          if(formRef.current){
              const data = new FormData(formRef.current)
              const json = {
                title:data.get('title'),
                description:data.get('description'),
                ...assets
              }
              console.log(json)
              const result = await updateWidget(router.query.id as string, json)
              context.setIsLoading(false)
              setCreated(true)
          }
        } catch (error) {
          console.log(error)
          context.setIsLoading(false)
          context.setError(true)
        }
    }

  return (
    <>
      <div>
        <ComeBackButton />
      </div>
      <form ref={ formRef } onSubmit={handleSubmit} method="POST" encType='multipart/form-data' >
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
          <input defaultValue={widget.title} name="title" type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="descripción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
          <input defaultValue={widget.description} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <div onClick={()=>handleAssetClick('images')} >seleccionar imagen</div>
          <p>{ assetsId.imageId ? assetsId.imageId : widget.image?.id  }</p>
        </div>
        <div className="mb-6">
          <div onClick={()=>handleAssetClick('videos')} >seleccionar video</div>
          <p>{ assetsId.videoId ? assetsId.videoId : widget.video?.id }</p>
        </div>
        <div className="mb-6">
          <div onClick={()=>handleAssetClick('files')} >seleccionar archivo</div>
          <p>{ assetsId.fileId? assetsId.fileId : widget.file?.id }</p>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Crear
        </button>
      </form>
      { created && (
        <div>
          <div>Widget creado exitosamente</div>
          <div onClick={()=>{context.setIsLoading(true); router.back()}}>volver</div>
        </div>
      )}
      { context.isLoading && (
        <div>
          <div>Cargando...</div>
        </div>
      )}

      { showMediaModal && <MediaModal type={mediaType} selectorHandler={setAssetsId} openModal={setShowMediaModal} /> }
    </>
  )
}

export default create