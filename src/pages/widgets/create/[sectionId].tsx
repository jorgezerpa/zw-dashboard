import React, { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { createWidget } from '../../../services/zwAPI'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton';
import { useUIContext } from '../../../context/UIContext';
import { MediaModal } from '../../../components/mediaModal/MediaModal';

const create = () => {
  const context = useUIContext()
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [created, setCreated] = useState(false)

    useEffect(()=>{context.setIsLoading(false)}, [])

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        context.setIsLoading(true)
        try {
          if(formRef.current){
              const data = new FormData(formRef.current)
              const json = {
                title:data.get('title'),
                description:data.get('description'),
                imageId:data.get('imageId')
              }
              const result = await createWidget(router.query.sectionId, json)
              context.setIsLoading(false)
              setCreated(true)
          }
        } catch (error) {
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
          <input name="title" type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="descripción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
          <input name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="imageId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
          <input name="imageId" type="text" id="imageId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Crear
        </button>
      </form>
      { created && (
        <div>
          <div>Programa creado exitosamente</div>
          <div onClick={()=>{context.setIsLoading(true); router.back()}}>volver</div>
        </div>
      )}
      { context.isLoading && (
        <div>
          <div>Cargando</div>
        </div>
      )}
      <MediaModal filter="images" />
    </>
  )
}

export default create