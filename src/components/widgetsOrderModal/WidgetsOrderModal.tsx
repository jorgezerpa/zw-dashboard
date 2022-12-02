import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { getWidgets } from '../../services/zwAPI'
import Dragable from './dragable'
import Dropable from './dropable'

export const WidgetsOrderModal = ({sectionId, openModal}:{sectionId:string, openModal:Dispatch<SetStateAction<boolean>>}) => {
  const [widgets, setWidgets] = useState<any[]>([])
  
  const handleSetNewOrder = (widgets:any[]) => {
    setWidgets(widgets)
  }

  useEffect(() => {
   (async()=>{
      const result = await getWidgets(sectionId)
      setWidgets(result.widgets)
   })()
  }, [])

  return (
    <div className='absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.1)]'>  
      <div className='w-[700px] h-[400px] bg-white relative shadow-sm overflow-y-scroll'>
        <div onClick={()=>openModal(false)} >cerrar</div>  
        <div className='flex w-full'>
            { widgets.length>0 && <Dropable dragables={widgets} itemPositionRef={'start'} setOrder={handleSetNewOrder} />}
            {widgets.map((dragable, index)=>(
                <div key={'dragable'+dragable.id} className='flex'>
                    <Dragable item={dragable} />
                    <Dropable dragables={widgets} itemPositionRef={index} setOrder={handleSetNewOrder} />
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
