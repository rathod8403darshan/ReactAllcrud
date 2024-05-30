import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ApiFun() {
    const [arr, setArr] = useState([]);
    const [obj, setObj] = useState({});
    const [blank, setBlank] = useState({});
    const [popup, setPopup] = useState(false);
    const [text, setText] = useState("");



    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = () => {
        axios.get("https://student-api.mycodelibraries.com/api/product/get").then((Apivalue) => {
            setArr([...Apivalue.data.data])
        })
    }

    const show = (e) => {
        obj[e.target.name] = e.target.value
        blank[e.target.name] = ""
        setObj({ ...obj })
        setBlank({ ...blank })
    }

    const Data = () => {
       if(obj._id === undefined){
        setObj({ ...obj })
        axios.post("https://student-api.mycodelibraries.com/api/product/add", obj).then((res) => {
            setPopup(true);
            setText(res.data.message);
            fetchData();
        })
       }
       else{
        obj.id = obj._id
        axios.post("https://student-api.mycodelibraries.com/api/product/update",obj).then((res)=> {
            setPopup(true);
            setText(res.data.message);
            fetchData();
        })
       }
        setObj({ ...blank });
    }

    const deletetdata = (id) => {
        axios.delete("https://student-api.mycodelibraries.com/api/product/delete?id=" + id).then((res) => {
            setPopup(true);
            setText(res.data.message);
            fetchData();
        })
    }
    const editdata = (id) => {
        axios.get("https://student-api.mycodelibraries.com/api/product/get-product-by-id?id=" + id).then((res) => {
            console.log(res.data.data)

            setObj({ ...res.data.data });
        })
    }
    if (popup) {
        setInterval(() => {
            setPopup(false);
        }, 3000)
    }


    const Dataarr = ["category", "productName", "price", "clothSize", "inStock", "description"]

    return (
        <>
            <div className={` position-absolute end-0 w-25 text-center  alert  bg-success text-white ${popup ? 'd-block' : 'd-none '} align-items-center`} role="alert">
                <div>
                    {text}
                </div>
            </div>
            {/* <form action="" className='mx-auto w-50 mb-4 shadow-lg p-3 mt-4'>

             {Dataarr.map((x,i)=>(
              <div key={i}>
                    <label htmlFor="">{x}</label>  <br />
                    <input type={x==="price"?  'number':"text"} name={x} className='w-100' onChange={show} value={obj.x}/>
                </div>
             ))}
                <br />
                <button className='btn btn-primary' type='button' onClick={Data}>Submit</button>
            </form> */}

            <form className='w-50 mx-auto  shadow-lg p-4'>
                <label>category</label>
                <input type='text' className='w-100 my-2' name='category' value={obj.category} onChange={show} />
                <label>productName</label>
                <input type='email' className='w-100 my-2' name='productName' value={obj.productName} onChange={show} />
                <label>description</label>
                <input type='text' className='w-100 my-2' name='description' value={obj.description} onChange={show} />
                <label>price</label>
                <input type='number' className='w-100 my-2' name='price' value={obj.price} onChange={show} />
                <label>clothSize</label>
                <input type='text' className='w-100 my-2' name='clothSize' value={obj.clothSize} onChange={show} />
                <label>inStock</label>
                <input type='text' className='w-100 my-2' name='inStock' value={obj.inStock} onChange={show} />

                <button type='button' className='btn btn-primary mt-3' onClick={Data}>Submit</button>
            </form>

            <table className='table table-dark'>
                <thead>
                    <tr>

                        {Dataarr.map((x, i) => (<th key={i}>{x}</th>))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((x, i) => (
                        <tr key={i}>
                            {Dataarr.map((e, i) => (<td key={i}>{x[e]}</td>))}
                            <td className=''>
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