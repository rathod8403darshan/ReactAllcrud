import React, { createContext, useState } from 'react'
import { ImgZoomout } from './ImgFunc';
import First from './First';
import FormFirst from './FormFirst';
export const Creatcontext1 = createContext();

function PerentFirst() {
    let [arr,setArr]= useState( JSON.parse(localStorage.getItem("arr2")) || []);
    const [obj,setObj]= useState({});
    const [blank,setBlank]= useState({});
    const [img,setImg]= useState("");
    let [count,setCount]= useState(JSON.parse(localStorage.getItem("count2")) || 0);

  return (
    <>
        <Creatcontext1.Provider value={{arr,setArr,obj,setObj,count,setCount,blank,setBlank,img,setImg}}>
                <FormFirst/>
              <First/>
        </Creatcontext1.Provider>
        <div className="ZoomDiv">
            <div className="ZoomImg">
                 
            </div>
            <div className='position-fixed top-0 end-0 text-white fs-1 me-4' onClick={()=>ImgZoomout()}>
                    X
            </div>
        </div>
    </>
  )
}

export default PerentFirst
