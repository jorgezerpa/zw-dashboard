import React, { useState, useEffect, SyntheticEvent, useRef } from 'react'
import { getAssets } from '../../services/zwAPI'
import { useRouter } from 'next/router'
import { useUIContext } from '../../context/UIContext'

const defaultThumbnail = "i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"

const index = () => {
    const context = useUIContext()
    const router = useRouter()
    const [assets, setAssets] = useState<{ id:string, name:string, identifier:string, path:string }[]>([])
    const typeRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
      (async()=>{
            context.setIsLoading(true)
            try {
                const result = await getAssets('images')
                setAssets(result.images)
                context.setIsLoading(false)
            } catch (error) {
                context.setIsLoading(false)
                context.setError(true)
            }
        })()
    }, [router])

    const handleFilter = async(filter:string|undefined) => {
            if(filter){
                const result = await getAssets(filter)
                setAssets(result[filter])
                context.setIsLoading(false)
                return 
            }
      }

    const handleClickToUpload = () => {router.push('/media/upload')}
    const handleClickToEdit = (id:string|number) => context.handleNavigate(`/media/edit/${id}?type=${typeRef.current?.value}`)

    return (
        <>        
        { context.isLoading && 'loading' }
            <>
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
                <div onClick={handleClickToUpload} >crear</div>   
                { (!context.isLoading && assets.length<=0) && <div>no tienes assets</div>}
               
                { !context.isLoading && (
                    <div className='flex justify-center flex-wrap gap-5'>
                        { assets.length>0 && assets.map(asset => {
                            const pathArr = asset.path.split("/") 
                            const path = pathArr.slice(3, pathArr.length).join("/")
                            return(
                                <div key={'media-'+asset.path} className="">
                                    <div className='w-[150px] h-[150px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage:`url(https://${ typeRef.current?.value==='images'?path:defaultThumbnail})` }}></div>
                                    <h3 className='font-bold mb-2'>{asset.name}</h3>
                                    <p>{asset.identifier}</p>
                                    <button onClick={()=>handleClickToEdit(asset.id)}>editar</button>
                                    {/* <p>{asset.path}</p> */}
                                </div>
                            )
                        })}
                    </div>
                )}
            </>
        </>
    )
}

export default index