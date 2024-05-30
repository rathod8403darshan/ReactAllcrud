import React from 'react';
import { handleZoomin } from './ImgFun';

function Table({ arr, deletedata, editdata }) {
  return (
    <>
      <div className="" >
        <table  className='w-100 text-white  ' style={{backgroundColor:"transparent"}}>
          <thead>
            <tr className='fs-3 border border-2'>
              <th className='border'>id</th>
              <th className='border'>Profile</th>
              <th className='border'>First Name</th>
              <th className='border'>Last Name</th>
              <th className='border'>Email</th>
              <th className='border'>Password</th>
              <th className='border'>Gender</th>
              <th className='border'>Technology</th>
              <th className='border'>Action</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((x, i) => (
              <tr key={i} className="fs-6 fw-lighter mt-5 border">
                <td className='border'>{x.id}</td>
                <td className='border'><img src={x.profile} alt="" height={"50px"} style={{cursor:"pointer"}} onClick={()=>handleZoomin(x.profile)}/></td>
                <td className='border'>{x.fname}</td>
                <td className='border'>{x.lname}</td>
                <td className='border'>{x.email}</td>
                <td className='border'>{x.Password}</td>
                <td className='border'>{x.gender}</td>
                <td className='border'>{x.tech.join(",")}</td>
                <td className='border'>
                  <button onClick={() => deletedata(x.id)} className='btn btn-danger me-2'>Delete</button>
                  <button onClick={() => editdata(x.id)} className='btn btn-warning'>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
