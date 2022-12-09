import React, { useState, useEffect, useRef, Dispatch, SetStateAction, RefObject } from 'react'
import { getWidgets } from '../../services/zwAPI'
import Dragable from './dragable'
import Dropable from './dropable'
import ScrollZone from './ScrollZone'
import { GrFormClose } from 'react-icons/gr'
import useAuth from '../../hooks/useAuth'

type WidgetType = {
  id?: number, 
  title?:string,
  description?:string,
  image?: {id:number},
  video?: {id:number},
  file?: {id:number},
}

const dragElement = (item:WidgetType) => (
  <div className='w-full py-1 flex justify-center'>
    <div className='w-[85%] bg-blue-800 rounded-lg p-3'>
      <h3 className='font-bold text-white text-xl'>{item.title}</h3>

    </div>
  </div>
)

const dropElement = () => (
  <div className='w-full flex justify-center'>
    <div className='py-[2px] px-[40px] text-small border-dashed border-gray-500 text-gray-500 border-[1px]'>soltar aquí</div>
  </div>
)

export const WidgetsOrderModal = ({sectionId, openModal, handleWidgetsSort, widgetsSort }:{sectionId:string, openModal:Dispatch<SetStateAction<boolean>>, handleWidgetsSort:(widgets:WidgetType[])=>void, widgetsSort:number[]}) => {
  const [widgets, setWidgets] = useState<any[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { handleLogin, token } = useAuth()
  handleLogin()

  const handleSetNewOrder = (widgets:any[]) => {
    setWidgets(widgets)
    handleWidgetsSort(widgets)
  }

  const handleIsDragging = (value:boolean) => setIsDragging(value)

  useEffect(() => {
   (async()=>{
      if(token){
        const result = await getWidgets(sectionId, token)
        let widgetsSorted:WidgetType[] = []
        widgetsSort.forEach((id)=>{
          result.widgets.forEach((widget:WidgetType)=>{if(id==widget.id) widgetsSorted.push(widget)})
        })
        setWidgets(widgetsSorted)
      }
   })()
  }, [token])

  return (
    <div className='absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.3)]'>  
      <div className='relative'>
        <div className='top-0 left-0 right-0 z-20'>
          <ScrollZone scrollRef={scrollRef} scrollDirection='up' />  
        </div>
          <div ref={scrollRef} className='w-[800px] h-[450px] bg-white relative shadow-sm overflow-y-scroll'>
            <div onClick={()=>openModal(false)} className="mt-5 ml-5 mb-4" >
              <GrFormClose  size={30} />
            </div>
            <p className='text-gray-600 text-center text-md ml-5 mb-4'>arrastra y suelta para cambiar el orden de los widgets.</p>
            <div className='flex flex-col w-full'>
                { (widgets?.length>0 && isDragging) && <Dropable dragables={widgets} render={dropElement} itemPositionRef={'start'} setOrder={handleSetNewOrder} />}
                {widgets?.map((dragable, index)=>(
                    <div key={'dragable'+dragable.id} className='flex flex-col'>
                        <Dragable item={dragable} render={dragElement} handleIsDragging={handleIsDragging} />
                        { isDragging && <Dropable dragables={widgets} render={dropElement} itemPositionRef={index} setOrder={handleSetNewOrder} />}
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


