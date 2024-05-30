import React from 'react';

function Table({ arr, deletedata, editdata }) {
  return (
    <>
      <div className="w-100">
        <table className='table w-100 table-success'>
          <thead>
            <tr>
              <th>id</th>
              <th>Profile</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Technology</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((x, i) => (
              <tr key={i}>
                <td>{x.id}</td>
                <td><img src={x.profile} alt="" style={{height:"50px", objectFit:"cover"}} /></td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.Password}</td>
                <td>{x.gender}</td>
                <td>{x.tech.join(",")}</td>
                <td>
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
