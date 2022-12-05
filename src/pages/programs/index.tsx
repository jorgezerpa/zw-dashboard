import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { getPrograms } from '../../services/zwAPI';
import { useUIContext } from '../../context/UIContext';
import { CreateButton } from '../../commons/CreateButton';
import { Loading } from '../../components/Loading';

const index = () => {
  const { isLoading, setIsLoading, error, setError, handleNavigate } = useUIContext()
  const router = useRouter()
  const [programs, setPrograms] = useState([])

  const handleClickToEdit = (id:string|number) => handleNavigate(`/programs/${id}`)
  const handleClickToSection = (id:string|number) => handleNavigate(`/sections/${id}`) //the program Id
  const handleClickToCreate = () => router.push('/programs/create')

  useEffect(() => {
    (async()=>{
      try {
        const result = await getPrograms()
        setPrograms(result.programs)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(true)
      }
    })()
  }, [])
  
  return (
    <>
      <div className='w-full flex justify-end items-center pt-10 pr-10'>
        <CreateButton handleClickToCreate={()=>handleClickToCreate()} />          
      </div>
      {isLoading && <div><Loading /></div>}
      {(!isLoading && !error ) && (
          <div className='w-full h-screen p-5 sm:p-10 flex flex-wrap gap-20'>
            { programs.length<=0 && <div className='w-full flex justify-center items-center h-[200px]'><h3 className='text-gray-900 text-5xl font-bold'>No Tienes Programas</h3></div> }
            { programs.length>0 && programs.map((program:{ id:string|number, name:string, description:string })=>(
              <div 
                key={`programKey${program.id}`} 
                className='bg-blue-800 shadow-md shadow-black p-5 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
                onClick={()=>handleClickToSection(program.id) }
              >
                <h2 className='text-white text-center font-bold text-xl pb-2'>{ program.name }</h2>
                <p className='text-white text-center pb-5 text-md'>{ program.description }</p>
                <button onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(program.id)}} className="py-2 px-4 bg-yellow-500 font-bold text-white rounded-xl hover:shadow-white hover:shadow-sm" >editar</button>
              </div>
            ))}
          </div>
      )}
    </>
  );
}

export default index