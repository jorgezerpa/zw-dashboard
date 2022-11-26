import React, { useRef, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { getSection, updateSection } from '../../../services/zwAPI'
import useUIState from '../../../hooks/useUIState'
import { ComeBackButton } from '../../../components/ComeBackButton'

const upsert = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { id } = useRouter().query
  const [section, setSection] = useState<{id?:string, name?:string, coverImage?:string, description?:string, type?:string, widgetsOrder?:string}>({})
  const { isLoading, setIsLoading } = useUIState(true)

  useEffect(() => {
    (async()=>{
      if(typeof id === 'string'){
        const result = await getSection(id)
        setSection(result.section)
        setIsLoading(false)
      }
    })()
  }, [])

  const handleSubmit = async(e:SyntheticEvent) => {
      e.preventDefault()
      if(formRef.current){
          const data = new FormData(formRef.current)
          if(section.id){
            const result = await updateSection(section.id, data)
            console.log(result)
          }
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

  return (
    <div className='m-5'>
      <div>
        <ComeBackButton />
      </div>
      <h2 className='text-4xl font-bold mb-5'>Actualizar Sección</h2>
      { isLoading
          ? 'loading' 
          :(
          <form ref={ formRef } onSubmit={handleSubmit} onChange={handleOnChage} method="POST" encType='multipart/form-data' >
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input defaultValue={section.name} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input name="coverImage" type="file" id="coverImage" accept='image' required />
            </div>
            <div className="mb-6">
              <label htmlFor="descripción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
              <input defaultValue={section.description} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="widgetsOrder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Widgets Order</label>
              <input defaultValue={section.widgetsOrder} name="widgetsOrder" type="text" id="widgetsOrder" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipo</label>
              <input defaultValue={section.type} name="type" type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Crear
            </button>
          </form>
          )}
    </div>
  )
}

export default upsert