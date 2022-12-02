import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { reOrder } from './orderUtil'

type WidgetType = {
  id?: number, 
  title?:string,
  description?:string,
  image?: {id:number},
  video?: {id:number},
  file?: {id:number},
}

const myDropTarget = ({ itemPositionRef, dragables, setOrder }:{itemPositionRef:number|'start', dragables:WidgetType[], setOrder:(arr:any[])=>void}) => {
    
  const [componentDragables, setComponentDragables] = useState(dragables)

  const dropHandler = (item:{id:number}, monitor:any) =>{
    const newSort = reOrder(dragables, item.id, itemPositionRef)
    setOrder(newSort)
  }

  const [collectedProps, drop] = useDrop(() => ({
    accept:['dragable'],
    drop: dropHandler,
    collect: (monitor)=>({
      didDrop: monitor.didDrop(),
    })
  }), [dragables])

  return(
    <>
      <div ref={drop} className=" mx-5 w-12 h-12 bg-purple-500 text-white font-bold text-center">Drop Target</div>
    </>
  ) 
}

export default myDropTarget
