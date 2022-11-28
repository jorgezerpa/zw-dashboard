const BASEPATH = 'https://zerpasw.zerpacode.com/api/v1'

const endpoints = {
    getPrograms: `${BASEPATH}/dashboard/programs`,
    createProgram:`${BASEPATH}/dashboard/programs`,
    getProgram: (id:string)=>`${BASEPATH}/dashboard/programs/${id}`,
    updateProgram:(id:string)=>`${BASEPATH}/dashboard/programs/${id}`,
    deleteProgram:(id:string)=>`${BASEPATH}/dashboard/programs/${id}`,
    
    getSections: (programId:string)=>`${BASEPATH}/dashboard/sections/${programId}`,
    getSection: (id:string)=>`${BASEPATH}/dashboard/sections/find-one/${id}`,
    createSection:(programId:string)=>`${BASEPATH}/dashboard/sections/${programId}`,
    updateSection:(id:string)=>`${BASEPATH}/dashboard/sections/${id}`,
    deleteSection:(id:string)=>`${BASEPATH}/dashboard/sections/${id}`,

    getWidgets: (sectionId:string)=>`${BASEPATH}/dashboard/widgets/${sectionId}`,
    getWidget: (id:string)=>`${BASEPATH}/dashboard/widgets/find-one/${id}`,
    createWidget:(sectionId:string)=>`${BASEPATH}/dashboard/widgets/${sectionId}`,
    updateWidget: (id:string)=>`${BASEPATH}/dashboard/widgets/${id}`,
    deleteWidget: (id:string)=>`${BASEPATH}/dashboard/widgets/${id}`,

    mediaUpload: ()=>`${BASEPATH}/media/manage/upload`,
    mediaUpdate: (id:string, type:string)=>`${BASEPATH}/media/manage/${id}?type=${type}`,
    mediaDelete: (id:string, type:string)=>`${BASEPATH}/media/manage/${id}?type=${type}`,
    mediaGetAssets: `${BASEPATH}/media/manage`

}

export default endpoints
