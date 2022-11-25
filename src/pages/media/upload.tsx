import React, { SyntheticEvent, useRef } from 'react'
import { uploadAsset } from '../../services/zwAPI'

const upload = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()
        if(formRef.current){
            const data = new FormData(formRef.current)
            const result = await uploadAsset(data)
            console.log(result)
        }
    }

    return (
    <div>
        <form ref={formRef} method='POST' onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" name="identifier" placeholder='identificador' />
            <input type="text" name="name" placeholder='nombre' />
            <input type="file" name="asset" />
            <button type='submit' >subir</button>
        </form>
    </div>
  )
}

export default upload