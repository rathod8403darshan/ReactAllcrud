import React, { useEffect, useState, usestate } from 'react'
import axios from 'axios'
import { loaderFun } from './LoaderFunc';
import Swal from 'sweetalert2'

function ApiFun() {
    const [arr, setArr] = useState([]);
    const [obj, setObj] = useState({ hobbies: [] });
    let [blank, setBlank] = useState({ hobbies: [] });
    const [popup, setPopup] = useState(false);
    const [text, setText] = useState("");



    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        // axios.get("https://student-api.mycodelibraries.com/api/student/get").then((Apivalue) => {
        //     setArr([...Apivalue.data.data] )
        // })
        loaderFun(true)
        fetch("https://student-api.mycodelibraries.com/api/student/get").then(async (res) => {
            let data = await res.json()
            setArr([...data.data])
            loaderFun(false)
        })
    }
    const show = (e) => {
        if (e.target.name === "hobbies") {
            if (e.target.checked) {
                obj.hobbies.push(e.target.value);
            }
            else {
                obj.hobbies = obj.hobbies.filter((x) => x !== e.target.value)
            }
            blank.hobbies = []
        }
        else {
            obj[e.target.name] = e.target.value;
            blank[e.target.name] = ""
        }
        setObj({ ...obj });
        setBlank({ ...blank });
    }
    const Data = () => {

       
        if (obj._id === undefined) {

            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                loaderFun(true)
                setObj({ ...obj })
                // axios.post("https://student-api.mycodelibraries.com/api/student/add", obj).then((res) => {
                //     setPopup(true);
                //     setText(res.data.message);
                //     fetchData();
                // })
                fetch("https://student-api.mycodelibraries.com/api/student/add", {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-Type": "application/json"
                    }
                   
                }).then((res) => {
                    setPopup(true);
                    fetchData();
                    blank = { firstName: "", lastName: "", age: "", city: "", gender: "", hobbies: [] }
                    setBlank({ ...blank })
                    setObj({ ...blank });
                    console.log(blank);
                    loaderFun(false);
                })
    


                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });

          
        }
        else {

            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Saved!", "", "success");

                  loaderFun(true)
                  try {
                    obj.id = obj._id;
                    // axios.post("https://student-api.mycodelibraries.com/api/student/update",obj).then((res)=> {
                    //     setPopup(true);
                    //     setText(res.data.message);
                    //     fetchData();
                    //     blank={firstName:"",lastName:"",age:"",city:"",gender:"" , hobbies:[]}
                    //     setBlank({...blank})
                    //     setObj({...blank});
                    //     console.log(blank);
                    // })
                    fetch("https://student-api.mycodelibraries.com/api/student/update", {
                        method: "POST",
                        body: JSON.stringify(obj),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((res) => {
                        setPopup(true);
    
                        fetchData();
                        blank = { firstName: "", lastName: "", age: "", city: "", gender: "", hobbies: [] }
                        setBlank({ ...blank })
                        setObj({ ...blank });
                        console.log(blank);
                        loaderFun(false)
                    })
    
                } catch (error) {
                    console.log(error);
                }


                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });

           
        }

        setObj({ ...blank });
        // setObj(blank);

    }

    const deletetdata = (id) => {
        // axios.delete("https://student-api.mycodelibraries.com/api/student/delete?id="+id).then((res)=> {
        //  setPopup(true);
        //  setText(res.data.message);
        //  fetchData();
        // })

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              loaderFun(true)
              fetch("https://student-api.mycodelibraries.com/api/student/delete?id=" + id, {
                  method: "DELETE",
              }).then((res) => {
                  fetchData();
                  loaderFun(false)
              })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });

        
    }

    const editdata = (id) => {
        // axios.get("https://student-api.mycodelibraries.com/api/student/get-student-by-id?id=" + id).then((res) => {
        //     setObj({ ...res.data.data, hobbies: res.data.data.hobbies.split(",") });
        // })

        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Edit it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              
              loaderFun(true)
        fetch("https://student-api.mycodelibraries.com/api/student/get-student-by-id?id=" + id).then(async (res) => {
            const data = await res.json()
            console.log(data);
            setObj({ ...data.data, hobbies: data.data.hobbies.split(",") });
            loaderFun(false)
        })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });

      

    }


    if (popup) {
        setInterval(() => {
            setPopup(false);
        }, 3000)
    }

    return (
        <>
            <div className={` position-absolute end-0 w-25 text-center  alert  bg-success text-white ${popup ? 'd-block' : 'd-none '} align-items-center`} role="alert">
                <div>
                    {text}
                </div>
            </div>
            <form action="" className='mx-auto w-50 mb-4 shadow-lg p-3 mt-4'>

                <div>
                    <label htmlFor="">First Name</label>   <br />
                    <input type="text" name='firstName' className='w-100' onChange={show} value={obj.firstName} /><br />

                </div>
                <div>
                    <label htmlFor="">Last Name</label>  <br />
                    <input type="text" name='lastName' className='w-100' onChange={show} value={obj.lastName} /><br />

                </div>

                <div>
                    <label htmlFor="">age</label>  <br />
                    <input type="number" name='age' className='w-100' onChange={show} value={obj.age} />

                </div>
                <div>
                    <label htmlFor="">city</label>  <br />
                    <input type="text" name='city' className='w-100' onChange={show} value={obj.city} />

                </div>
                <div>
                    <label htmlFor="">Gender :</label><br />
                    <input type="radio" name='gender' className='ms-2 me-2' value={"male"} onChange={show} checked={obj.gender === "male"} />male
                    <input type="radio" name='gender' className='ms-2 me-2' value={"female"} onChange={show} checked={obj.gender === "female"} />Female
                    <input type="radio" name='gender' className='ms-2 me-2' value={"other"} onChange={show} checked={obj.gender === "other"} />other
                </div>
                <div>
                    <label htmlFor="">Hobbies :</label>  <br />
                    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"cricket"} onChange={show} checked={obj.hobbies.includes("cricket")} />Cricket
                    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"football"} onChange={show} checked={obj.hobbies.includes("football")} />football
                    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kho-kho"} onChange={show} checked={obj.hobbies.includes("kho-kho")} />kho kho
                    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kabaddi"} onChange={show} checked={obj.hobbies.includes("kabaddi")} />kabaddi
                </div>


                <br />

                <button className='btn btn-primary' type='button' onClick={Data}>Submit</button>
            </form>

            <table className='table table-dark'>
                <thead>
                    <tr>

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
                            <td>{x.firstName}</td>
                            <td>{x.lastName}</td>
                            <td>{x.age}</td>
                            <td>{x.city}</td>
                            <td>{x.gender}</td>
                            <td>{x.hobbies}</td>
                            <td>
                                <button className='btn btn-danger me-3' onClick={() => deletetdata(x._id)}>Delete</button>
                                <button className='btn btn-warning' onClick={() => editdata(x._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default ApiFun