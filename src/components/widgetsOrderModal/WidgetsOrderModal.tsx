import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { getWidgets } from '../../services/zwAPI'

export const WidgetsOrderModal = ({sectionId, openModal}:{sectionId:string, openModal:Dispatch<SetStateAction<boolean>>}) => {
  const [widgets, setWidgets] = useState<any[]>([])
  console.log(widgets)
  useEffect(() => {
   (async()=>{
      const result = await getWidgets(sectionId)
      setWidgets(result)
   })()
  }, [])

  return (
    <div className='absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.1)]'>  
      <div className='w-[700px] h-[400px] bg-white relative shadow-sm overflow-y-scroll'>
        <div onClick={()=>openModal(false)} >cerrar</div>  
            holaaa
      </div>
    </div>
  )
}
