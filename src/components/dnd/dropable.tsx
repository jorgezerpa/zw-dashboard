import { useDrop } from 'react-dnd'
import { reOrder } from './orderUtil'

const myDropTarget = ({ itemPositionRef, dragables }:{itemPositionRef:number|'start', dragables:{id:number}[]}) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept:['dragable'],
    drop: (item:{id:number}, monitor)=>{
      const newSort = reOrder(dragables, item.id, itemPositionRef)
      console.log(newSort)
    },
    collect: (monitor)=>({
      didDrop: monitor.didDrop(),
    })
  }))

  return(
    <>
      <div ref={drop} className=" mx-5 w-12 h-12 bg-purple-500 text-white font-bold text-center">Drop Target</div>
    </>
  ) 
}

export default myDropTarget
