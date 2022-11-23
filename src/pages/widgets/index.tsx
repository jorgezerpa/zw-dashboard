import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
  const router = useRouter()

  const handleClick = (id:number|string) => {
    router.push(`/widgets/${id}`)
  }
  
  return (
    <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
      { [0,1,2,3].map((widget)=>(
        <div 
        key={`widgetKey${widget}`} 
        className='bg-gray-200 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
        onClick={()=>handleClick(widget)}
        >
          <h2 className='text-center'>Widget name</h2>
          <p className='text-center'>Widget description</p>
        </div>
      ))}
    </div>
  );
}

export default index