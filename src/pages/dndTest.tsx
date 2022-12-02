import { monitorEventLoopDelay } from 'perf_hooks'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Dragable from '../components/dnd/dragable'
import Dropable from '../components/dnd/dropable'

const dragables = [{id:1},{id:2},{id:3},{id:4},{id:5}]

const dndTest = () => {

  return (
    <>
        <div className='flex w-full'>
            <Dropable dragables={dragables} itemPositionRef={'start'} />
            {dragables.map((dragable, index)=>(
                <div key={'dragable'+dragable.id} className='flex'>
                    <Dragable item={dragable} />
                    <Dropable dragables={dragables} itemPositionRef={index+1} />
                </div>
            ))}
        </div>
    </>
  )
}

export default dndTest