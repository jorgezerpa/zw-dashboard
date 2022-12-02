//destiny === item before the new position of changing
export function reOrder(arr:{id:number}[], changing:number, destiny:number|'start'){
    const changingIndex = arr.findIndex(item=>item.id===changing)
    // const destinyIndex = arr.findIndex(item=>item.id===destiny)
    const newOrderArray: typeof arr = []

    if(destiny==='start'){
        newOrderArray.push(arr[changingIndex])
        newOrderArray.push(...arr.splice(1, arr.length))
        return newOrderArray
    }

    arr.forEach((item, currIndex)=>{
        if(item.id===changing) return
        if(item.id===destiny) {
            newOrderArray.push(arr[currIndex])
            newOrderArray.push(arr[changingIndex])
        }
        else {
            newOrderArray.push(arr[currIndex])
        }
    })

    return newOrderArray
}