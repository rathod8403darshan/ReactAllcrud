import React, { useEffect, useReducer, useState } from 'react'
import HocReducer from './HocReducer'
import { ReducerAPiFun } from './ReducerAPiFun';
import { type } from '@testing-library/user-event/dist/type';
import { Link } from 'react-router-dom';

function ApiReducerTable() {
    const [arr,setArr]=useState([]);
    const [state, dispatch] = useReducer(ReducerAPiFun,[]);

    useEffect(()=> {
        dispatch({type:"GET",})
        GetFun()      
    },[]);

    useEffect(()=> {
        GetFun()
    },[state]);

    const GetFun = async()=> {
        const data = await state
        setArr(data)
    }


    console.log(arr)
    
    const deletetdata = (id)=> {
        dispatch({type:"DELETE",id:id})
    }
    
  return (
    <div>

        <table className='table table-dark mt-3'>
                <thead>
                    <tr>
                       
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>age</th>
                        <th>City</th>
                        <th>gender</th>
                        <th>Hobbies</th>
                        <th>Action</th>

                    </tr>
                </thead>
                        <tbody>
                            {arr.map((x, i) => (
                                <tr key={i}>
                                    <td><img src={x.image} height={"50"} width={"50"}></img></td>
                                    <td>{x.firstName}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.age}</td>
                                    <td>{x.city}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobbies}</td>
                                    <td className=''>
                                            <button className='btn btn-danger me-3 ' onClick={()=>deletetdata(x._id)}>Delete</button>
                                            <Link className='btn btn-warning' to={`/formApi/${x._id}`}>Edit</Link>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
            </table>
    </div>
  )
}

export default HocReducer(ApiReducerTable)
