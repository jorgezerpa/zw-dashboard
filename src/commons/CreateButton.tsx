import React from 'react'

export const CreateButton = ({handleClickToCreate}:{handleClickToCreate:()=>void}) => {
  return (
    <button onClick={()=>{handleClickToCreate()}} className="py-3 px-5 bg-green-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-black " >create</button>
  )
}
