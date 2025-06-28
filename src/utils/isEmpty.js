// 
export default function isEmpty(arr){ //arr is array with values
    return arr.some(ele=> typeof ele !== "string" || !ele?.trim() )
    // return arr.some(ele=>!ele?.length)
} 

