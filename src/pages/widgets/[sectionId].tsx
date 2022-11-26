import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getWidgets } from '../../services/zwAPI';
import { ComeBackButton } from '../../components/ComeBackButton';

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
      <div className='w-full flex justify-between items-center pt-10 pr-10'>
        <ComeBackButton />
        <button onClick={()=>{ router.push(`/widgets/create/${router.query.sectionId}`)}} className="py-3 px-5 bg-gray-500 text-white rounded-xl">crear</button>
      </div>

      <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
        { widgets.length<=0 && <div> no tienes Widgets</div> }
        { widgets.length>0 && widgets.map((widget:{ id:string|number, title:string, description:string })=>(
          <div 
            key={`widgetKey${widget.id}`} 
            className='bg-blue-800 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
            onClick={()=>handleClickToSection(widget.id) }
          >
            <h2 className='text-white text-center font-medium text-xl pb-2'>{ widget.title }</h2>
            <p className='text-white text-center pb-5'>{ widget.description }</p>
            <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(widget.id)}} className="py-2 px-4 bg-yellow-500 text-white rounded-xl">editar</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default index