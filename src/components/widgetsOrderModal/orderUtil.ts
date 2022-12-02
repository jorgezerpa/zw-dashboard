//arr === array of dragable items
//changing === id of the dragged element
//destiny === index of the drop zone when dragged element was leaves
export function reOrder(arr:any[], changing:number, destiny:number|'start'){
    const changingIndex = arr.findIndex(item=>item.id===changing)
    const newOrderArray: typeof arr = []

    if(destiny==='start'){
        newOrderArray.push(arr[changingIndex])
        newOrderArray.push(...arr.filter(item=>item.id !== arr[changingIndex].id))
        return newOrderArray
    }

    arr.forEach((item, currIndex)=>{
        if(item.id===changing){
            return
        }
        if(currIndex===destiny) {
            newOrderArray.push(arr[currIndex])
            newOrderArray.push(arr[changingIndex])
        }
        else {
            newOrderArray.push(arr[currIndex])
        }
    })

    return newOrderArray
}