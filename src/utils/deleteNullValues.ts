function deleteNullValues(object:Object){
    const notNullObject:any = {}
    const keys = Object.keys(object)
    keys.forEach(key=>{
        if(object[key as keyof Object]!==null){
            notNullObject[key as keyof Object] = object[key as keyof Object]
        }
    })

    return notNullObject
}

export default deleteNullValues
