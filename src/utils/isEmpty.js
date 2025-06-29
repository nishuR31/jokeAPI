//
export default function isEmpty(arr) {
  //arr is array with values
  //   return arr.some((ele) => !(ele?.trim()) || !ele);
  return arr.some((ele) => !ele?.length || !ele);
  // return arr.some(ele=>!ele?.length)
}
