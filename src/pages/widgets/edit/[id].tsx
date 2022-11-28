import React, { useRef, SyntheticEvent, useState, useEffect } from 'react'
import { getWidget, updateWidget, deleteWidget } from '../../../services/zwAPI'
import { useRouter } from 'next/router'
import { ComeBackButton } from '../../../components/ComeBackButton';
import { useUIContext } from '../../../context/UIContext';

const upsert = () => {
  const { error, isLoading, setError, setIsLoading, handleNavigate } = useUIContext()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [widget, setWidget] = useState<{id?:string, title?:string, description?:string, image?:{id:string}}>({})
  const [updated, setUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    (async()=>{
      try {
        if(typeof router.query.id === 'string'){
          const result = await getWidget(router.query.id)
          setWidget(result.widget)
          setIsLoading(false)
        }
      } catch (error) {
          setIsLoading(false)
          setError(true)
      }
    })()
  }, [router])


  const handleSubmit = async(e:SyntheticEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setUpdated(false)
    try {
      if(formRef.current){
          const data = new FormData(formRef.current)
          const json = {
            title:data.get('title'),
            description:data.get('description'),
            imageId:data.get('imageId')
          }
          const result = await updateWidget(router.query.id as string, json)
          setIsUpdating(false)
          setUpdated(true)
      }
    } catch (error) {
      console.log(error)
      setIsUpdating(false)
      setError(true)
    }
  }

  const handleDelete = async() => {
    setIsLoading(true)
    try {
      if(widget.id){
        const result = await deleteWidget(widget.id)
        router.back()
      }
    } catch (error) {
        setIsLoading(false)
        setError(true)
    }
  }

  return (
    <>
      <div>
        <ComeBackButton />
      </div>
      { isLoading && "loading..." }
      { (!isLoading && !error) && (
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
            <label htmlFor="imageId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
            <input defaultValue={widget.image?.id} name="imageId" type="text" id="imageId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Actualizar
          </button>
          <button onClick={handleDelete} className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Eliminar
          </button>
        </form>
      )}
      { updated && (
        <div>
          <div>Widget actualizado exitosamente</div>
          <div onClick={()=>{setIsLoading(true);router.back()}}>volver</div>
        </div>
      )}
      { (isUpdating) && (
        <div>
          <div>actualizando...</div>
        </div>
      )}
    </>
  )
}

export default upsert
