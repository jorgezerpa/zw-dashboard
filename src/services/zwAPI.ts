import endpoints from "../utils/zwEndpoints";
import axios from 'axios'

export const getPrograms = async(token:string) => {
    try {
        const result = await axios.get(endpoints.getPrograms, { headers:{ 'Authorization': `bearer ${token}` } } )
        return result.data.data
    } catch (error) {
        throw new Error()
    }
}
export const getProgram = async(id:string, token:string) => {
    const result = await axios.get(endpoints.getProgram(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const createProgram = async(program:any, token:string) => {
    const result = await axios.post(endpoints.createProgram, program, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const updateProgram = async(id:string, program:any, token:string) => {
    const result = await axios.patch(endpoints.updateProgram(id), program, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const deleteProgram = async(id:string, token:string) => {
    console.log(id)
    const result = await axios.delete(endpoints.deleteProgram(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}

export const getSections = async(programId:string, token:string) => {
    const result = await axios.get(endpoints.getSections(programId), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const getSection = async(id:string, token:string) => {
    const result = await axios.get(endpoints.getSection(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const createSection = async(programId:any, Section:any, token:string) => {
    const result = await axios.post(endpoints.createSection(programId), Section, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const updateSection = async(id:string, Section:any, token:string) => {
    const result = await axios.patch(endpoints.updateSection(id), Section, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const deleteSection = async(id:string, token:string) => {
    const result = await axios.delete(endpoints.deleteSection(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}



export const getWidgets = async(sectionId:string, token:string) => {
    const result = await axios.get(endpoints.getWidgets(sectionId), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const getWidget = async(id:string, token:string) => {
    const result = await axios.get(endpoints.getWidget(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const createWidget = async(sectionId:any, Widget:any, token:string) => {
    const result = await axios.post(endpoints.createWidget(sectionId), Widget, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const updateWidget = async(id:string, Widget:any, token:string) => {
    const result = await axios.patch(endpoints.updateWidget(id), Widget, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const deleteWidget = async(id:string, token:string) => {
    const result = await axios.delete(endpoints.deleteWidget(id), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}





export const getAssets = async(filter:string|null=null, token:string) => {
    let path = endpoints.mediaGetAssets
    if(filter){
        path = `${path}?filter=${filter}`
    }
    const result = await axios.get(path, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const uploadAsset = async(asset:any, token:string) => {
    const result = await axios.post(endpoints.mediaUpload(), asset, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const getAsset = async(id:string, type:'image'|'video'|'file', token:string) => {
    const result = await axios.get(endpoints.mediaGetOne(id, type), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const updateAsset = async(id:string, type:'image'|'video'|'file', asset:any, token:string) => {
    const result = await axios.patch(endpoints.mediaUpdate(id, type), asset, { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}
export const deleteAsset = async(id:string, type:'image'|'video'|'file', token:string) => {
    const result = await axios.delete(endpoints.mediaUpdate(id, type), { headers:{ 'Authorization': `bearer ${token}` } })
    return result.data.data
}




