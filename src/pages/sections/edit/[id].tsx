import React, { useRef, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { getSection, updateSection, deleteSection } from '../../../services/zwAPI'
import { useUIContext } from '../../../context/UIContext'
import { ComeBackButton } from '../../../components/ComeBackButton'
import { WidgetsOrderModal } from '../../../components/widgetsOrderModal/WidgetsOrderModal'
import { Loading } from '../../../components/Loading'
import { SuccessForm } from '../../../components/SuccessForm'
import useAuth from '../../../hooks/useAuth'

type WidgetType = {
  id?: number, 
  title?:string,
  description?:string,
  image?: {id:number},
  video?: {id:number},
  file?: {id:number},
}

const upsert = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [widgetsSort, setWidgetsSort] = useState<number[]>([])  
  const [showWidgetsOrderModal, setShowWidgetsOrderModal] = useState(false)
  const [section, setSection] = useState<{id?:string, name?:string, coverImage?:string, description?:string, type?:string, widgetsOrder?:string}>({})
  const { isLoading, setIsLoading, setError, error } = useUIContext()
  const [updated, setUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { handleLogin } = useAuth()
  handleLogin()
  
  useEffect(() => {
    (async()=>{
      try {
        if(typeof router.query.id === 'string'){
          setIsLoading(true)
          const result = await getSection(router.query.id)
          setSection(result.section)
          setWidgetsSort(JSON.parse(result.section.widgetsOrder))
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setError(false)
      } 
    })()
  }, [router])

  const handleWidgetsSort = (widgets:WidgetType[]) => {
    const widgetsIds = widgets.map(widget=>widget.id)
    setWidgetsSort(widgetsIds as number[])
  }

  const handleSubmit = async(e:SyntheticEvent) => {
      e.preventDefault()
      setIsUpdating(true)
      setUpdated(false)
      try {
        if(formRef.current){
            const data = new FormData(formRef.current)
            data.set('widgetsOrder', JSON.stringify(widgetsSort))
            if(section.id){
              const result = await updateSection(section.id, data)
              setWidgetsSort(JSON.parse(result.section.widgetsOrder))
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
      <h2 className='text-4xl font-bold mb-5 pl-5'>Actualizar Sección</h2>
      {isLoading && <div><Loading /></div>}
      { (!isLoading && !error) && (
          <form className='pl-5' ref={ formRef } onSubmit={handleSubmit} onChange={handleOnChage} method="POST" encType='multipart/form-data' >
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input defaultValue={section.name} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Portada</label>
              <input name="coverImage" type="file" id="coverImage" accept='image' />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
              <input defaultValue={section.description} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <div onClick={()=>setShowWidgetsOrderModal(true)} className="py-2 px-4 hover:shadow-md hover:shadow-gray-700 bg-blue-700 inline-block text-white rounded-lg">orden de los widgets</div>
            </div>

              <div className="mb-6">
                <label defaultValue={section.type || 'class'} htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipo</label>
                <select name="type" id="type" required>
                  <option value="class">clase</option>
                  <option value="file">archivo</option>
                  <option value="image">imagen</option>
                </select>
            </div>
            <button type="submit" className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Actualizar
            </button>
            <button onClick={handleDelete} className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Eliminar
            </button>
          </form>
      )}
      { updated && (
        <div>
          <SuccessForm message='sección actualizada exitosamente' />
        </div>
      )}
      { (isUpdating) && (
        <div>
          <div>actualizando...</div>
        </div>
      )}

        { showWidgetsOrderModal && <WidgetsOrderModal widgetsSort={widgetsSort} handleWidgetsSort={handleWidgetsSort} openModal={setShowWidgetsOrderModal} sectionId={section.id as string} /> }
    </div>
  )
}

export default upsert