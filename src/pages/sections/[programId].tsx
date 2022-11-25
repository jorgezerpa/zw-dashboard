import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getSections } from '../../services/zwAPI';

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
      }
    })()
  }, [])
  
  return (
    <>
      <button onClick={()=>{ router.push(`/sections/create/${router.query.programId}`) }} >crear</button>
      <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
        { sections.length<=0 && <div> no tienes Secciones </div> }
        { sections.length>0 && sections.map((section:{ id:string|number, name:string, description:string })=>(
          <div 
            key={`sectionKey${section.id}`} 
            className='bg-gray-200 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
            onClick={()=>handleClickToSection(section.id) }
          >
            <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(section.id) }}>editar</div>
            <h2 className='text-center'>{ section.name }</h2>
            <p className='text-center'>{ section.description }</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default index