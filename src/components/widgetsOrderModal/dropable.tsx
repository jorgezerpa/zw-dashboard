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

const myDropTarget = ({ itemPositionRef, dragables, setOrder, render }:{itemPositionRef:number|'start', dragables:WidgetType[], setOrder:(arr:any[])=>void, render:()=>any}) => {
    
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
      <div ref={drop}>
        { render() }
      </div>
    </>
  ) 
}

export default myDropTarget
