import endpoints from "../utils/zwEndpoints";
import axios from 'axios'

export const getPrograms = async() => {
    const result = await axios.get(endpoints.getPrograms)
    return result.data.data
}
export const getProgram = async(id:string) => {
    const result = await axios.get(endpoints.getProgram(id))
    return result.data.data
}
export const createProgram = async(program:any) => {
    const result = await axios.post(endpoints.createProgram, program)
    return result.data.data
}
export const updateProgram = async(id:string, program:any) => {
    const result = await axios.patch(endpoints.updateProgram(id), program)
    return result.data.data
}
export const deleteProgram = async(id:string) => {
    const result = await axios.delete(endpoints.deleteProgram(id))
    return result.data.data
}


export const getSections = async(programId:string) => {
    const result = await axios.get(endpoints.getSections(programId))
    return result.data.data
}
export const getSection = async(id:string) => {
    const result = await axios.get(endpoints.getSection(id))
    return result.data.data
}
export const createSection = async(programId:any, Section:any) => {
    const result = await axios.post(endpoints.createSection(programId), Section)
    return result.data.data
}
export const updateSection = async(id:string, Section:any) => {
    const result = await axios.patch(endpoints.updateSection(id), Section)
    return result.data.data
}
export const deleteSection = async(id:string) => {
    const result = await axios.delete(endpoints.deleteSection(id))
    return result.data.data
}



export const getWidgets = async(sectionId:string) => {
    const result = await axios.get(endpoints.getWidgets(sectionId))
    return result.data.data
}
export const getWidget = async(id:string) => {
    const result = await axios.get(endpoints.getWidget(id))
    return result.data.data
}
export const createWidget = async(sectionId:any, Widget:any) => {
    const result = await axios.post(endpoints.createWidget(sectionId), Widget)
    return result.data.data
}
export const updateWidget = async(id:string, Widget:any) => {
    const result = await axios.patch(endpoints.updateWidget(id), Widget)
    return result.data.data
}
export const deleteWidget = async(id:string) => {
    const result = await axios.delete(endpoints.deleteWidget(id))
    return result.data.data
}





export const getAssets = async(filter:string|null=null) => {
    let path = endpoints.mediaGetAssets
    if(filter){
        path = `${path}?filter=${filter}`
    }
    const result = await axios.get(path)
    return result.data.data
}
export const uploadAsset = async(asset:any) => {
    const result = await axios.post(endpoints.mediaUpload(), asset)
    return result.data.data
}
export const updateAsset = async(id:string, type:'image'|'video'|'file', asset:any) => {
    const result = await axios.patch(endpoints.mediaUpdate(id, type), asset)
    return result.data.data
}
export const deleteAsset = async(id:string, type:'image'|'video'|'file') => {
    const result = await axios.delete(endpoints.mediaUpdate(id, type))
    return result.data.data
}




