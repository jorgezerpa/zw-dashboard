import { useEffect, useState, useRef } from 'react'
import { useDrop } from 'react-dnd'

const myDropTarget = ({ scrollRef, scrollDirection }:{ scrollRef:React.RefObject<HTMLDivElement>, scrollDirection:'up'|'down' }) => {
    const animationRef = useRef<null|number>(null)

    const [collectedProps, drop] = useDrop(() => ({
    accept:['dragable'],
    collect: (monitor)=>({
      didDrop: monitor.didDrop(),
      onHover: monitor.isOver(),
      onDrop: monitor.didDrop()
    })
  }), [])

  let scrollTop = scrollRef.current?.scrollTop as number
  const speed = .5
  
  const animate = () => {
    if(scrollDirection==='down') scrollTop+=speed
    if(scrollDirection==='up') scrollTop-=speed
    scrollRef.current?.scrollTo({top:scrollTop})
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(()=>{
    if(collectedProps.onHover){
        animate()
    }
    if(!collectedProps.onHover){
        if(animationRef.current){
            scrollTop = scrollRef.current?.scrollTop as number
            cancelAnimationFrame(animationRef.current)
        }
    }
  },[collectedProps.onHover])


  return(
    <>
      <div ref={drop} className="w-full h-[50px]">
      </div>
    </>
  ) 
}

export default myDropTarget
