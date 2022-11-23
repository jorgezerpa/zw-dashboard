import React, { useRef, useEffect, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { getProgram, updateProgram } from '../../services/zwAPI'

const upsert = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { id } = useRouter().query
  const [program, setProgram] = useState<{id?:string, name?:string, description?:string}>({})

  useEffect(() => {
    (async()=>{
      if(typeof id === 'string'){
        const result = await getProgram(id)
        setProgram(result.program)
      }
    })()
  }, [])


  const handleSubmit = async(e:SyntheticEvent) => {
      e.preventDefault()
      if(formRef.current){
          const data = new FormData(formRef.current)
          
          const updatedProgram = {
              name: data.get('name'),
              description: data.get('description'),
          }
          if(program.id){
            const result = await updateProgram(program.id, updatedProgram)
            console.log(result)
          }
      }
  }

  const handleOnChage = (e:SyntheticEvent) => {
    if(formRef.current){
      const data = new FormData(formRef.current)
      const name = data.get('name') as string
      const description = data.get('description') as string
      setProgram(prev=>({ ...prev, name, description }))
    }
  }

  
  return (
    <form ref={ formRef } onSubmit={handleSubmit} onChange={handleOnChage} >
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input defaultValue={program.name || ''} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre" required />
        </div>
        <div className="mb-6">
          <label htmlFor="descripción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
          <input defaultValue={program.description || ''} name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="descripción" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Crear
      </button>
    </form>   
  )
}

export default upsert