import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RestApiFun() {
    const token = { headers: { Authorization: "Bearer 0a5dd53d67b9ec24b96e00ff6013b569ff4240b133270a2b1d97716215a54507" } }

    const [arr, setArr] = useState([]);
    const [obj, setObj] = useState({ hobbies: [] });
    let [blank, setBlank] = useState({ hobbies: [] });
    const [popup, setPopup] = useState(false);
    const [text, setText] = useState("");



    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        try {
            axios.get("https://gorest.co.in/public/v2/users", token).then((res) => {
                setArr([...res.data]);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const show = (e) => {

        obj[e.target.name] = e.target.value
        blank[e.target.name] = "";
        setObj({ ...obj });
        setBlank({ ...blank });
    }
    const Data = async () => {

      if(obj.id === undefined){
        try {
            await axios.post("https://gorest.co.in/public/v2/users", obj, token).then((res) => {
                fetchData();
            })
        } catch (error) {
            console.log(error);
        }
      }
      else{
        try {
            await axios.patch("https://gorest.co.in/public/v2/users/"+obj.id, obj, token).then((res) => {
                fetchData();
                blank = {name : " ",email:" ",status:" ",gender:" "}
                setObj({...blank})
            })
        } catch (error) {
            console.log(error);
        }
      }

        setObj({ ...blank });
        // console.log(obj);
    }

    const deletetdata = async (id) => {
        try {
            await axios.delete("https://gorest.co.in/public/v2/users/" + id, token).then((res) => {
                fetchData();
            })
        } catch (error) {
            console.log(error);
        }

    }

    const editdata = async (id) => {
        try {
            await axios.get("https://gorest.co.in/public/v2/users/"+id, token).then((res) => {
                setObj({...res.data});
            })
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>

            <form action="" className='mx-auto w-50 mb-4 shadow-lg p-3 mt-4'>

                <div>
                    <label htmlFor="">Name</label>   <br />
                    <input type="text" name='name' className='w-100' onChange={show} value={obj.name} /><br />

                </div>
                <div>
                    <label htmlFor="">gmail</label>  <br />
                    <input type="text" name='email' className='w-100' onChange={show} value={obj.email} /><br />

                </div>


                <div>
                    <label htmlFor="">Gender :</label><br />
                    <input type="radio" name='gender' className='ms-2 me-2' value={"male"} onChange={show} checked={obj.gender === "male"} />male
                    <input type="radio" name='gender' className='ms-2 me-2' value={"female"} onChange={show} checked={obj.gender === "female"} />Female
                    <input type="radio" name='gender' className='ms-2 me-2' value={"other"} onChange={show} checked={obj.gender === "other"} />other
                </div>

                <div>
                    <label htmlFor="">status :</label><br />
                    <input type="radio" name='status' className='ms-2 me-2' value={"active"} onChange={show} checked={obj.status === "active"} />active
                    <input type="radio" name='status' className='ms-2 me-2' value={"inactive"} onChange={show} checked={obj.status === "inactive"} />inactive

                </div>

                <br />

                <button className='btn btn-primary' type='button' onClick={Data}>Submit</button>
            </form>

            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>gender</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((x, i) => (
                        <tr key={i}>
                            <td>{x.name}</td>
                            <td>{x.email}</td>
                            <td>{x.gender}</td>
                            <td>{x.status}</td>
                            <td>
                                <button className='btn btn-danger me-3' onClick={() => deletetdata(x.id)}>Delete</button>
                                <button className='btn btn-warning' onClick={() => editdata(x.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default RestApiFun