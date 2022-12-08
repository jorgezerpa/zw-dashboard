import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getSections } from '../../services/zwAPI';
import { ComeBackButton } from '../../components/ComeBackButton';
import { useUIContext } from '../../context/UIContext';
import { CreateButton } from '../../commons/CreateButton';
import useAuth from '../../hooks/useAuth'

const index = () => {
  const { isLoading, setIsLoading, error, setError, handleNavigate } = useUIContext()
  const router = useRouter()
  const [sections, setSections] = useState([])

  const handleClickToEdit = (id:string|number) => handleNavigate(`/sections/edit/${id}`)
  const handleClickToSection = (id:string|number) => handleNavigate(`/widgets/${id}`) //the program Id
  const handleClickToCreate = (programId:string|number) => router.push(`/sections/create/${programId}`)
  const { handleLogin } = useAuth()
  handleLogin()
  
  useEffect(() => {
    (async()=>{
      try {
        if(typeof router.query.programId === 'string'){
          const result = await getSections(router.query.programId)
          setSections(result.sections)
          setIsLoading(false)
        }          
      } catch (error) {
        setIsLoading(false)
        setError(true)
      }
    })()
  }, [])
  
  return (
    <>
      <div className='w-full flex justify-between items-center pt-10 pr-10'>
        <ComeBackButton />
        <CreateButton handleClickToCreate={()=>handleClickToCreate(router.query.programId as string)} />
      </div>

      {isLoading && <div>Loading...</div>}
      
      {(!isLoading && !error) && (
        <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
          { sections.length<=0 && <div> no tienes Secciones </div> }
          { sections.length>0 && sections.map((section:{ id:string|number, name:string, description:string })=>(
            <div 
              key={`sectionKey${section.id}`} 
              className='bg-blue-800 shadow-md shadow-black p-5 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
              onClick={()=>handleClickToSection(section.id) }
            >
              <h2 className='text-white text-center font-bold text-xl pb-2'>{ section.name }</h2>
              <p className='text-white text-center pb-5 text-md'>{ section.description }</p>
              <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(section.id)}} className="py-2 px-4 bg-yellow-500 font-bold text-white rounded-xl hover:shadow-white hover:shadow-sm" >editar</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default index