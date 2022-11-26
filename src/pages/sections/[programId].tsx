import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getSections } from '../../services/zwAPI';
import { ComeBackButton } from '../../components/ComeBackButton';

const index = () => {
  const router = useRouter()
  const [sections, setSections] = useState([])

  const handleClickToEdit = (id:string|number) => router.push(`/sections/edit/${id}`)
  const handleClickToSection = (id:string|number) => router.push(`/widgets/${id}`) //the program Id

  useEffect(() => {
    (async()=>{
      if(typeof router.query.programId === 'string'){
        const result = await getSections(router.query.programId)
        setSections(result.sections)
        console.log(result.sections)
      }
    })()
  }, [])
  
  return (
    <>
      <div className='w-full flex justify-between items-center pt-10 pr-10'>
        <ComeBackButton path='/programs' />
        <button onClick={()=>{ router.push(`/sections/create/${router.query.programId}`)}} className="py-3 px-5 bg-gray-500 text-white rounded-xl">crear</button>
      </div>
      <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
        { sections.length<=0 && <div> no tienes Secciones </div> }
        { sections.length>0 && sections.map((section:{ id:string|number, name:string, description:string })=>(
          <div 
            key={`sectionKey${section.id}`} 
            className='bg-blue-800 p-5 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
            onClick={()=>handleClickToSection(section.id) }
          >
            <h2 className='text-white text-center font-medium text-xl pb-2'>{ section.name }</h2>
            <p className='text-white text-center pb-5'>{ section.description }</p>
            <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(section.id)}} className="py-2 px-4 bg-yellow-500 text-white rounded-xl" >editar</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default index