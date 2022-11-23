const BASEPATH = 'https://zerpasw.zerpacode.com/api/v1/dashboard'

const endpoints = {
    getPrograms: `${BASEPATH}/programS`,
    createProgram:`${BASEPATH}/programs`,
    getProgram: (id:string)=>`${BASEPATH}/programs/${id}`,
    updateProgram:(id:string)=>`${BASEPATH}/programs/${id}`,
    deleteProgram:(id:string)=>`${BASEPATH}/programs/${id}`,
    
    getSections: (programId:string)=>`${BASEPATH}/sections/${programId}`,
    getSection: (id:string)=>`${BASEPATH}/sections/find-one/${id}`,
    createSection:(programId:string)=>`${BASEPATH}/sections/${programId}`,
    updateSection:(id:string)=>`${BASEPATH}/sections/${id}`,
    deleteSection:(id:string)=>`${BASEPATH}/sections/${id}`,

    getWidgets: (sectionId:string)=>`${BASEPATH}/widgets/${sectionId}`,
    getWidget: (id:string)=>`${BASEPATH}/widgets/find-one/${id}`,
    createWidget:(sectionId:string)=>`${BASEPATH}/widgets/${sectionId}`,
    updateWidget: (id:string)=>`${BASEPATH}/widgets/find-one/${id}`,
    deleteWidget: (id:string)=>`${BASEPATH}/widgets/find-one/${id}`,

    mediaUpload: ()=>`/media/manage/upload`,
    mediaUpdate: (id:string, type:string)=>`${BASEPATH}/media/manage/${id}?type=${type}`,
    mediaDelete: (id:string, type:string)=>`${BASEPATH}/media/manage/${id}?type=${type}`,
    mediaGetAssets: `${BASEPATH}/media/manage`

}

export default endpoints
