import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getWidgets } from '../../services/zwAPI';

const index = () => {
  const router = useRouter()
  const [widgets, setWidgets] = useState([])

  useEffect(() => {
    (async()=>{
      if(typeof router.query.sectionId === 'string'){
        const result = await getWidgets(router.query.sectionId)
        setWidgets(result.widgets)
      }
    })()
  }, [])

  const handleClickToEdit = (id:string|number) => router.push(`/sections/edit/${id}`)
  const handleClickToSection = (id:string|number) => router.push(`/widgets/${id}`) //the program Id
  
  return (
    <>
      <button onClick={()=>{ router.push(`/sections/create/${router.query.programId}`) }} >crear</button>

      <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
        { widgets.length<=0 && <div> no tienes Widgets</div> }
        { widgets.length>0 && widgets.map((widget:{ id:string|number, name:string, description:string })=>(
          <div 
            key={`widgetKey${widget.id}`} 
            className='bg-gray-200 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
            onClick={()=>handleClickToSection(widget.id) }
          >
            <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(widget.id) }}>editar</div>
            <h2 className='text-center'>{ widget.name }</h2>
            <p className='text-center'>{ widget.description }</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default index