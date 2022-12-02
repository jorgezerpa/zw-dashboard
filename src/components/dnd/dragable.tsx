import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'

const dndTest = ({item}:{item:{id:number}}) => {
    const [collected, drag, dragPreview] = useDrag(()=>({
        type: 'dragable',
        item,
        collect: (monitor)=>({
            isDragging: monitor.isDragging(),
            didDrop: monitor.didDrop(),
            getDraged: monitor.getItem()
          })
    }))

    useEffect(()=>{
      if(collected.isDragging){
        console.log(collected.getDraged)
      }
    }, [collected.isDragging])

  return (
    <div ref={drag} className="w-12 h-12 bg-green-600 text-white">drag me</div>
  )
}

export default dndTest