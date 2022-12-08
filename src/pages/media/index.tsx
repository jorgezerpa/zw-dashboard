import React, { useState, useEffect, SyntheticEvent, useRef } from 'react'
import { getAssets } from '../../services/zwAPI'
import { useRouter } from 'next/router'
import { useUIContext } from '../../context/UIContext'
import { Loading } from '../../components/Loading'
import { CreateButton } from '../../commons/CreateButton';
import useAuth from '../../hooks/useAuth'

const defaultThumbnail = "i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"

const index = () => {
    const context = useUIContext()
    const router = useRouter()
    const [assets, setAssets] = useState<{ id:string, name:string, identifier:string, path:string }[]>([])
    const typeRef = useRef<HTMLSelectElement>(null)
    const { handleLogin, token } = useAuth()
    handleLogin()

    useEffect(() => {
      (async()=>{
            context.setIsLoading(true)
            if(token){
                try {
                    const result = await getAssets('images', token)
                    setAssets(result.images)
                    context.setIsLoading(false)
                } catch (error) {
                    context.setIsLoading(false)
                    context.setError(true)
                }
            }
        })()
    }, [router, token])

    const handleFilter = async(filter:string|undefined) => {
            if(filter && token){
                const result = await getAssets(filter, token)
                setAssets(result[filter])
                context.setIsLoading(false)
                return 
            }
      }

    const handleClickToUpload = () => {router.push('/media/upload')}
    const handleClickToEdit = (id:string|number) => context.handleNavigate(`/media/edit/${id}?type=${typeRef.current?.value}`)

    return (
        <div className='p-5'>
            <div className='w-full flex justify-between'>
                <select ref={typeRef} defaultValue="images" name="filter" id="filterWidgetsByType" onChange={(e:SyntheticEvent)=>{
                context.setIsLoading(true)
                const target = e.target as HTMLInputElement
                handleFilter(target.value)}
                }
                >
                    <option value="images">Imagenes</option>
                    <option value="files">Archivos</option>
                    <option value="videos">Videos</option>
                </select>
                <CreateButton handleClickToCreate={handleClickToUpload} />
            </div>        

            { context.isLoading && <Loading /> }
            { !context.isLoading && (
                <div className='p-2'>   
                    { (!context.isLoading && assets.length<=0) && <div>no tienes assets</div>}
    
                    { !context.isLoading && (
                        <div className='flex justify-center flex-wrap gap-10  pt-20'>
                            { assets.length>0 && assets.map(asset => {
                                const pathArr = asset.path.split("/") 
                                const path = pathArr.slice(3, pathArr.length).join("/")
                                return(
                                    <div key={'media-'+asset.path} className="">
                                        <div className='w-[150px] h-[150px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage:`url(https://${ typeRef.current?.value==='images'?path:defaultThumbnail})` }}></div>
                                        <h3 className='font-bold'>{asset.name}</h3>
                                        <p className='text-sm mb-3'><span className='font-bold'>identificador:</span> {asset.identifier}</p>
                                        <button onClick={()=>handleClickToEdit(asset.id)} className="py-2 px-4 bg-yellow-500 font-bold text-white rounded-xl hover:shadow-white hover:shadow-sm">
                                            editar
                                        </button>
                                        {/* <p>{asset.path}</p> */}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>                
            )}
        </div>
    )
}

export default index