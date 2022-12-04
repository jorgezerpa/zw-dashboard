import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'

type WidgetType = {
  id?: number, 
  title?:string,
  description?:string,
  image?: {id:number},
  video?: {id:number},
  file?: {id:number},
}

const dndTest = ({item, render, handleIsDragging}:{item:WidgetType, render:(item:WidgetType)=>any, handleIsDragging:(value:boolean)=>void}) => {
    const [collected, drag] = useDrag(()=>({
        type: 'dragable',
        item,
        collect: (monitor)=>({
            isDragging: monitor.isDragging(),
            didDrop: monitor.didDrop(),
            getDraged: monitor.getItem()
          })
    }))

    useEffect(()=>{
      handleIsDragging(collected.isDragging)
    }, [collected.isDragging])

  return (
    <div ref={drag} className="">
      { render(item) }
    </div>
  )
}

export default dndTest