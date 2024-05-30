// import React, { useReducer } from 'react'
// import { Link } from 'react-router-dom'
// import { ReducerAPiFun } from './ReducerAPiFun';

// function HocReducer(Component) {
    
    
//     const ReducerMain = ()=> {
//         return( <>
//          <div className='d-flex justify-content-center p-2 bg-danger'>
//                 <div className='bg-dark text-white p-2 fs-5 me-2 rounded-2'><Link className='text-white text-decoration-none p-2' to="/formApi">Form Api</Link></div>
//                 <div className='bg-dark text-white p-2 fs-5 me-2 rounded-2'><Link className='text-white text-decoration-none p-2' to="/tableApi">Table Api</Link></div>
//             </div>
//             <Component/>
//          </>)
//       }
      
//       return  ReducerMain
  
// }

// export default HocReducer

import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ReducerAPiFun } from './ReducerAPiFun';

function HocReducer(Component) {
    
    
    const ReducerMain = ()=> {

       const [state,dispatch] = useReducer(ReducerAPiFun,[])
       const navigate = useNavigate();
       const params = useParams();
       const [arr,setArr] = useState([]);

       useEffect(()=> {
            dispatch({type:"GET"})        
       },[])
       useEffect(()=> {
            GetData()        
       },[state])

       const GetData = async()=> {
                setArr(await state)
       }
        return( <>
         <div className='d-flex justify-content-center p-2 bg-danger'>
                <div className='bg-dark text-white p-2 fs-5 me-2 rounded-2'><Link className='text-white text-decoration-none p-2' to="/formApi">Form Api</Link></div>
                <div className='bg-dark text-white p-2 fs-5 me-2 rounded-2'><Link className='text-white text-decoration-none p-2' to="/tableApi">Table Api</Link></div>
            </div>
            <Component routes={{arr,navigate,params,dispatch}}/>
         </>)
      }
      
      return  ReducerMain
  
}

export default HocReducer

