import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getWidgets } from '../../services/zwAPI';
import { ComeBackButton } from '../../components/ComeBackButton';
import { useUIContext } from '../../context/UIContext';
import { CreateButton } from '../../commons/CreateButton';
import { Loading } from '../../components/Loading';
import useAuth from '../../hooks/useAuth'

const index = () => {
  const { isLoading, setIsLoading, error, setError, handleNavigate } = useUIContext()
  const router = useRouter()
  const [widgets, setWidgets] = useState([])
  const { handleLogin } = useAuth()
  handleLogin()

  useEffect(() => {
    (async()=>{
      try {
        setIsLoading(true)
        if(typeof router.query.sectionId === 'string'){
          const result = await getWidgets(router.query.sectionId)
          setWidgets(result.widgets)
          setIsLoading(false)
        }
      } catch (error) {
          setIsLoading(false)
          setError(true)
      }
    })()
  }, [router])

  const handleClickToEdit = (id:string|number) => handleNavigate(`/widgets/edit/${id}`)
  const handleClickToCreate = (sectionId:string|number) => router.push(`/widgets/create/${sectionId}`)
  const handleClickToSection = (id:string|number) => handleNavigate(`/widgets/${id}`) //the program Id
  
  return (
    <>
      <div className='w-full flex justify-between items-center pt-10 pr-10'>
        <ComeBackButton />
        <CreateButton handleClickToCreate={()=>handleClickToCreate(router.query.sectionId as string)} />
      </div>

      {isLoading && <div><Loading /></div>}

      {(!isLoading && !error ) && (
        <div className='w-full h-screen p-5 flex flex-wrap gap-20'>
          { widgets.length<=0 && <div> no tienes Widgets</div> }
          { widgets.length>0 && widgets.map((widget:{ id:string|number, title:string, description:string })=>(
            <div 
              key={`widgetKey${widget.id}`} 
              className='bg-blue-800 shadow-md shadow-black p-5 rounded-2xl w-[230px] h-[230px] flex flex-col justify-center items-center'
              onClick={()=>handleClickToSection(widget.id) }
            >
              <h2 className='text-white text-center font-bold text-xl pb-2'>{ widget.title }</h2>
              <p className='text-white text-center pb-5 text-md'>{ widget.description }</p>
              <div onClick={(e)=>{ e.stopPropagation(); handleClickToEdit(widget.id)}} className="py-2 px-4 bg-yellow-500 font-bold text-white rounded-xl hover:shadow-white hover:shadow-sm">editar</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default index