import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { getPrograms } from '../../services/zwAPI';

const index = () => {
  const router = useRouter()
  const [programs, setPrograms] = useState([])

  const handleClickToEdit = (id:string|number) => router.push(`/programs/${id}`)
  const handleClickToSection = (id:string|number) => router.push(`/sections/${id}`) //the program Id

  useEffect(() => {
    (async()=>{
      const result = await getPrograms()
      setPrograms(result.programs)
    })()
  }, [])
  
  return (
    <>
      <button onClick={()=>{ router.push('/programs/create') }} >crear</button>
      <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
        { programs.length<=0 && <div> no tienes programas </div> }
        { programs.length>0 && programs.map((program:{ id:string|number, name:string, description:string })=>(
          <div 
            key={`programKey${program.id}`} 
            className='bg-gray-200 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
            onClick={()=>handleClickToSection(program.id) }
          >
            <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(program.id) }}>editar</div>
            <h2 className='text-center'>{ program.name }</h2>
            <p className='text-center'>{ program.description }</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default index