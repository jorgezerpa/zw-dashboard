import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { deleteWidget, getWidget, updateWidget } from '../../../services/zwAPI'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton'
import { useUIContext } from '../../../context/UIContext'
import { MediaModal } from '../../../components/mediaModal/MediaModal'
import deleteNullValues from '../../../utils/deleteNullValues'
import { BsFillImageFill } from 'react-icons/bs'
import { FaVideo } from 'react-icons/fa'
import { AiFillFileText } from 'react-icons/ai'
import { SuccessForm } from '../../../components/SuccessForm'
import useAuth from '../../../hooks/useAuth'

const HaveAsset = () => {
  return(
    <div className='w-full flex justify-center'>
      <div className='w-[10px] h-[10px] bg-green-400 rounded-[50%]'></div>
    </div>
  )
}


type WidgetType = {
id?: number|string, 
title?:string,
description?:string,
image?: {id:number},
video?: {id:number},
file?: {id:number},
}

const update = () => {
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
    const { handleLogin, token } = useAuth()
    handleLogin()

    useEffect(()=>{
      (async()=>{
        if(typeof router.query.id === 'string' && token){
          const result = await getWidget(router.query.id, token)
          setWidget(result.widget)
          context.setIsLoading(false)
        }
      })()
    }, [router, token])

    const handleAssetClick = (type:'images'|'videos'|'files') => {
        setShowMediaModal(true)
        setMediaType(type)
    }

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        const assets = deleteNullValues(assetsId)
        try {
          if(formRef.current && token){
              const data = new FormData(formRef.current)
              const json = {
                title:data.get('title'),
                description:data.get('description'),
                ...assets
              }
              const result = await updateWidget(router.query.id as string, json, token)
              context.setIsLoading(false)
              setCreated(true)
          }
        } catch (error) {
          context.setIsLoading(false)
          context.setError(true)
        }
    }

    const handleDelete = async() => {
      context.setIsLoading(true)
      try {
        if(widget.id && token){
          const result = await deleteWidget(widget.id as string, token)
          router.back()
        }
      } catch (error) {
          context.setIsLoading(false)
          context.setError(true)
      }
    }

  return (
    <div className='pl-5'>
      <div>
        <ComeBackButton />
      </div>
      <h2 className='text-4xl font-bold mb-5 pl-5'>Update Widget</h2>
      <form className='pl-5' ref={ formRef } onSubmit={handleSubmit} method="POST" encType='multipart/form-data' >
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input defaultValue={widget.title} name="title" type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input defaultValue={widget.description} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='flex gap-10'>

          <div className="mb-6">
            <div onClick={()=>handleAssetClick('images')} >
              <BsFillImageFill size={50} />
            </div>
            <p className='text-center'>image</p>
            { assetsId.imageId && <HaveAsset /> }
          </div>
          <div className="mb-6">
              <div onClick={()=>handleAssetClick('videos')} >
                <FaVideo size={50} />
              </div>
              <p className='text-center'>video</p>
              { assetsId.videoId && <HaveAsset /> }
          </div>
          <div className="mb-6">
            <div onClick={()=>handleAssetClick('files')} >
              <AiFillFileText size={50} />
            </div>
            <p className='text-center'>file</p>
            { assetsId.fileId && <HaveAsset />}
          </div>
        </div>
        <button type="submit" className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            update
        </button>
        <button onClick={handleDelete} className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            delete
        </button>
      </form>
      { created && (
        <div>
          <SuccessForm message='widget updated successfully' />
        </div>
      )}
      { context.isLoading && (
        <div>
          <div>updating...</div>
        </div>
      )}

      { showMediaModal && <MediaModal type={mediaType} selectorHandler={setAssetsId} openModal={setShowMediaModal} /> }
    </div>
  )
}

export default update