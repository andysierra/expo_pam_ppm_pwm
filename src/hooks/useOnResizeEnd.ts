import { useState } from "react";

export const useOnResizeEnd = () => {

  const [dim, setDim] = useState([0,0]);
  const [callback, setCallback] = useState<Function>(()=>{});

  // triggers input callback
  let timeout:number = 0;

  // if user call this, timeout will be restarted
  const resizing = (width:number, height:number) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDim([width, height]);
      console.log(callback)
      callback();
    }, 1000);
  }

  return {
    width: dim[0],
    height: dim[1],
    setCallback,
    resizing
  }
}
