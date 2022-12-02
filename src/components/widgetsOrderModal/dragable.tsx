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

const dndTest = ({item}:{item:WidgetType}) => {
    const [collected, drag, dragPreview] = useDrag(()=>({
        type: 'dragable',
        item,
        collect: (monitor)=>({
            isDragging: monitor.isDragging(),
            didDrop: monitor.didDrop(),
            getDraged: monitor.getItem()
          })
    }))

  return (
    <div ref={drag} className="w-12 h-12 bg-blue-600 text-white"> {item.id}</div>
  )
}

export default dndTest