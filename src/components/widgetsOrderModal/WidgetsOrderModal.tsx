import React, { useState, useEffect, useRef, Dispatch, SetStateAction, RefObject } from 'react'
import { getWidgets } from '../../services/zwAPI'
import Dragable from './dragable'
import Dropable from './dropable'
import ScrollZone from './ScrollZone'

type WidgetType = {
  id?: number, 
  title?:string,
  description?:string,
  image?: {id:number},
  video?: {id:number},
  file?: {id:number},
}

const dragElement = (item:WidgetType) => (
  <div className='w-full py-4 flex justify-center'>
    <div className='w-3/4 bg-blue-800'>
      <h3 className='font-bold text-white text-xl'>{item.title}</h3>

    </div>
  </div>
)

const dropElement = () => (
  <div className='w-full py-4 flex justify-center'>
    <div className='p-[10px] bg-gray-200'>drop</div>
  </div>
)

export const WidgetsOrderModal = ({sectionId, openModal, handleWidgetsSort, widgetsSort }:{sectionId:string, openModal:Dispatch<SetStateAction<boolean>>, handleWidgetsSort:(widgets:WidgetType[])=>void, widgetsSort:number[]}) => {
  const [widgets, setWidgets] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSetNewOrder = (widgets:any[]) => {
    setWidgets(widgets)
    handleWidgetsSort(widgets)
  }

  useEffect(() => {
   (async()=>{
      const result = await getWidgets(sectionId)
      let widgetsSorted:WidgetType[] = []
      widgetsSort.forEach((id)=>{
        result.widgets.forEach((widget:WidgetType)=>{if(id==widget.id) widgetsSorted.push(widget)})
      })
      setWidgets(widgetsSorted)
   })()
  }, [])

  return (
    <div className='absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.1)]'>  
      <div className='relative'>
        <div className='top-0 left-0 right-0 z-20'>
          <ScrollZone scrollRef={scrollRef} scrollDirection='up' />  
        </div>
          <div ref={scrollRef} className='w-[700px] h-[400px] bg-white relative shadow-sm overflow-y-scroll'>
            <div onClick={()=>openModal(false)} >cerrar</div>
            <div className='flex flex-col w-full'>
                { widgets?.length>0 && <Dropable dragables={widgets} render={dropElement} itemPositionRef={'start'} setOrder={handleSetNewOrder} />}
                {widgets?.map((dragable, index)=>(
                    <div key={'dragable'+dragable.id} className='flex flex-col'>
                        <Dragable item={dragable} render={dragElement} />
                        <Dropable dragables={widgets} render={dropElement} itemPositionRef={index} setOrder={handleSetNewOrder} />
                    </div>
              ))}
            </div>
          </div>
          <div className='top-0 left-0 right-0 z-20'>
          <ScrollZone scrollRef={scrollRef} scrollDirection='down' />  
        </div>
      </div>
    </div>
  )
}


