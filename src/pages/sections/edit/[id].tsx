import React, { useRef, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { getSection, updateSection, deleteSection } from '../../../services/zwAPI'
import { useUIContext } from '../../../context/UIContext'
import { ComeBackButton } from '../../../components/ComeBackButton'
import { WidgetsOrderModal } from '../../../components/widgetsOrderModal/WidgetsOrderModal'

const upsert = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [showWidgetsOrderModal, setShowWidgetsOrderModal] = useState(false)
  const [section, setSection] = useState<{id?:string, name?:string, coverImage?:string, description?:string, type?:string, widgetsOrder?:string}>({})
  const { isLoading, setIsLoading, setError, error } = useUIContext()
  const [updated, setUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    (async()=>{
      try {
        if(typeof router.query.id === 'string'){
          setIsLoading(true)
          const result = await getSection(router.query.id)
          setSection(result.section)
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setError(false)
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
            if(section.id){
              const result = await updateSection(section.id, data)
              setIsUpdating(false)
              setUpdated(true)
            }
        }
      } catch (error) {
        setIsUpdating(false)
        setError(true)
      }
  }

  const handleOnChage = (e:SyntheticEvent) => {
    if(formRef.current){
      const data = new FormData(formRef.current)
      const name = data.get('name') as string
      const description = data.get('description') as string
      setSection(prev=>({ ...prev, name, description }))
    }
  }

  const handleDelete = async() => {
    setIsLoading(true)
    try {
      if(section.id){
        const result = await deleteSection(section.id)
        router.back()
      }
    } catch (error) {
        setIsLoading(false)
        setError(true)
    }
  }

  return (
    <div className='m-5'>
      <div>
        <ComeBackButton />
      </div>
      <h2 className='text-4xl font-bold mb-5'>Actualizar Sección</h2>
      { isLoading && 'loading...' }
      { (!isLoading && !error) && (
          <form ref={ formRef } onSubmit={handleSubmit} onChange={handleOnChage} method="POST" encType='multipart/form-data' >
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input defaultValue={section.name} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input name="coverImage" type="file" id="coverImage" accept='image' />
            </div>
            <div className="mb-6">
              <label htmlFor="descripción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
              <input defaultValue={section.description} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <div onClick={()=>setShowWidgetsOrderModal(true)}>orden de los widgets</div>
            </div>
            {/* <div className="mb-6">
              <label htmlFor="widgetsOrder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Widgets Order</label>
              <input defaultValue={section.widgetsOrder} name="widgetsOrder" type="text" id="widgetsOrder" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div> */}
            <div className="mb-6">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipo</label>
              <input defaultValue={section.type} name="type" type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Crear
            </button>
            <button onClick={handleDelete} className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Eliminar
                </button>
          </form>
      )}
      { updated && (
        <div>
          <div>Sección actualizada exitosamente</div>
          <div onClick={()=>{setIsLoading(true);router.back()}}>volver</div>
        </div>
      )}
      { (isUpdating) && (
        <div>
          <div>actualizando...</div>
        </div>
      )}

        { showWidgetsOrderModal && <WidgetsOrderModal openModal={setShowWidgetsOrderModal} sectionId={section.id as string} /> }
    </div>
  )
}

export default upsert