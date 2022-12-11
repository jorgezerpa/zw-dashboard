import React from 'react'

export const Loading = () => {
  return (
    <div className='w-full flex justify-center items-center h-[300px]'>
        <div className='relative w-[120px] h-[120px]'>
            <div className='top-[10px] left-[10px] absolute w-[100px] h-[100px] rounded-[50%] border-dashed border-gray-700 border-[3px] animate-spin'>
            </div>
            <div className='top-[15px] left-[15px] absolute w-[90px] h-[90px] rounded-[50%] border-dashed border-gray-500 border-[3px] animate-spin2'></div>
            <div className='flex w-full h-full justify-center items-center'>
                <p className='text-sm text-gray-900 font-bold'>...loading</p>
            </div>
    </div>
    </div>
  )
}
