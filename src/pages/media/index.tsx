import React, { useState, useEffect, SyntheticEvent } from 'react'
import { getAssets } from '../../services/zwAPI'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter()
    const [assets, setAssets] = useState<{ name:string, identifier:string, path:string }[]>([])

    useEffect(() => {
      (async()=>{
          try {
            const result = await getAssets('images')
            setAssets(result.images)
        } catch (error) {
            console.log(error)
        }
      })()
    }, [])

    const handleFilter = async(filter:string|undefined) => {
            if(filter){
                const result = await getAssets(filter)
                setAssets(result[filter])
                return 
            }
      }

    const handleClickToUpload = () => {
        router.push('/media/upload')
    }

    return (
        <>        
        <select defaultValue="images" name="filter" id="filterWidgetsByType" onChange={(e:SyntheticEvent)=>{
        const target = e.target as HTMLInputElement
        handleFilter(target.value)}
        }>
            <option value="images">Imagenes</option>
            <option value="files">Archivos</option>
            <option value="videos">Videos</option>
        </select>
            <div onClick={handleClickToUpload} >crear</div>   
            { assets.length<=0 && <div>no tienes assets</div>}
            { assets.length>0 && assets.map(asset => (
                <div key={'media-'+asset.path}>
                    <h3>{asset.name}</h3>
                    <p>{asset.identifier}</p>
                    <p>{asset.path}</p>
                </div>
            ))}
        </>
    )
}

export default index