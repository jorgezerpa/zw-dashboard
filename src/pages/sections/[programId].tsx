import React from 'react'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()

  const handleClickToSection = (id:number|string) => {
    router.push(`/widgets/${id}`) //section Id
  }

  const handleClickToEdit = (id:number|string) => {
    router.push(`/sections/edit/${id}`)
  }
  
  return (
    <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
      { [0,1,2,3].map((section)=>(
        <div 
        key={`sectionKey${section}`} 
        className='bg-gray-200 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
        onClick={()=>handleClickToSection(section)}
        >
          <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(section) }}>edit</div>
          <h2 className='text-center'>Section name</h2>
          <p className='text-center'>Section description</p>
        </div>
      ))}
    </div>
  );
}

export default index