import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ExamFuncrud() {
    const [lgShow, setLgShow] = useState(false);
    const [hide, setHide] = useState(false);

    const [arr, setarr] = useState([]);
    const [img, setimg] = useState("");
    const [obj, setobj] = useState({ skill: [] });
    const [blank, setblank] = useState({ skill: [] });
    let [count, setcount] = useState(0);



    const show = () =>{
        setLgShow(true);
        setHide(true);
   }
   const Hide1 = () =>{
        setLgShow(false);
        setHide(false);
   }


    const show1 = async (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                obj.skill.push(e.target.value);
            }
            else {
                obj.skill = obj.skill.filter((x) => x !== e.target.value);
            }
            blank.skill = [];
        }
        else if (e.target.type === "file") {
            const file = e.target.files[0];
            obj.profile = file ? await toBase64(file) : ""
            setimg(file ? await toBase64(file) : "");
        }
        // else if (e.target.type === "date") {
        //     const date1 = new Date(e.target.value);

        //     obj[e.target.name] = e.target.value = date1.getDate().toString().padStart(2, '0') + '-' + 
        //     (date1.getMonth() + 1).toString().padStart(2, '0') + '-' + 
        //     date1.getFullYear();
        //     blank[e.target.name] = "";
        // }
        else {
            obj[e.target.name] = e.target.value;
            blank[e.target.name] = "";
        }
        setobj({ ...obj })
    }

    const showData = () => {

        if (obj.id) {
            const ind = arr.findIndex((x) => x.id === obj.id);
            arr.splice(ind, 1, obj);
        }
        else {
            count++;
            setcount(count);
            obj.id = count;
            setblank({ ...blank })
            setobj({ ...obj })
            arr.push(obj);
        }

        setarr([...arr]);
        setobj(blank);
        setimg();
        setLgShow(false);
        setHide(false);
        // console.log(arr);
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    useEffect(() => {
        // if(JSON.parse(localStorage.getItem("arr")) && useState( JSON.parse(localStorage.getItem("cnt")) ) ){
        //     setarr(JSON.parse(localStorage.getItem("arr")) )
        //     setcount(useState( JSON.parse(localStorage.getItem("cnt"))))
        // }

        const arr = JSON.parse(localStorage.getItem("arr"));
        const cnt = JSON.parse(localStorage.getItem("cnt"));

        if (arr && cnt) {
            setarr(JSON.parse(localStorage.getItem("arr")))
            setcount(JSON.parse(localStorage.getItem("cnt")))
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("arr", JSON.stringify(arr))
        localStorage.setItem("cnt", JSON.stringify(count))
    }, [count, arr]);

    const deletedata = (id1) => {
        const ind = arr.findIndex((x) => x.id === id1);
        arr.splice(ind, 1);
        setarr([...arr]);
    }
    const editdata = (id1) => {
        const ind = arr.find((x) => x.id === id1);
        setimg(ind.profile);
        setobj({ ...ind });
        setLgShow(true);
        setHide(true);
    }
    return (
        <>



<Button onClick={show}>Large modal</Button>



            <table className='table table-dark mt-3'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>profile</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Gender</th>
                        <th>Skill</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((x, i) => (
                        <tr key={i}>
                            <td>{x.id}</td>
                            <td><img src={x.profile} alt="" style={{ width: "50px", height: "50px" }} /></td>
                            <td>{x.fname}</td>
                            <td>{x.pass}</td>
                            <td>{x.mail}</td>
                            <td>{new Date(x.date).toLocaleDateString()}</td>
                            <td>{x.gender}</td>
                            <td>{x.skill?.join(" , ")}</td>
                            <td>
                                <button className='btn btn-danger me-2' onClick={() => deletedata(x.id)}>Delete</button>
                                <button className='btn btn-warning' onClick={() => editdata(x.id)} >Edit</button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>


         
         {hide  &&   <Modal
                size="lg"
                show={lgShow}
                onHide={Hide1}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>  <form action="" className=' shadow-lg p-3 mt-3'>
                    <div>
                        <label htmlFor="" className=''>Name</label> <br />
                        <input type="text" name='fname' className='w-100' onChange={show1} value={obj.fname} />
                    </div>
                    <div>
                        <label htmlFor="" className=''>Password</label> <br />
                        <input type="password" name='pass' className='w-100' onChange={show1} value={obj.pass} />
                    </div>
                    <div>
                        <label htmlFor="" className=''>Email :</label>  <br />
                        <input type="text" name='mail' className='w-100' onChange={show1} value={obj.mail} />
                    </div>
                    <div>
                        <label htmlFor="" className=''>Date</label> <br />
                        <input type="date" name='date' className='w-100' onChange={show1} value={obj.date} />
                    </div>
                    <div>
                        <label htmlFor="" className=''>Gender : </label> <br />
                        <input type="radio" name='gender' value="male" onChange={show1} checked={obj.gender === "male"} /> Male <br />
                        <input type="radio" name='gender' value="female" onChange={show1} checked={obj.gender === "female"} /> Female <br />
                        <input type="radio" name='gender' value="other" onChange={show1} checked={obj.gender === "other"} />  other <br />
                    </div>
                    <div>
                        <label htmlFor="" className=''>Skill : </label> <br />
                        <input type="checkbox" name='skill' value="Node" onChange={show1} checked={obj.skill.includes("Node")} /> Node <br />
                        <input type="checkbox" name='skill' value="React" onChange={show1} checked={obj.skill.includes("React")} /> React <br />
                        <input type="checkbox" name='skill' value="Angular" onChange={show1} checked={obj.skill.includes("Angular")} />  Angular <br />
                        <input type="checkbox" name='skill' value="Html" onChange={show1} checked={obj.skill.includes("Html")} />  Html <br />
                    </div>

                    <div>
                        <label htmlFor="">Profile</label>
                        <input type="file" onChange={show1} name='files' /> <br />
                        <img src={img} alt="" style={{ width: "100px", height: "100px" }} />
                    </div>

                    <button className='btn btn-primary mt-3' type="button" onClick={showData} > Submit</button>
                </form>
                </Modal.Body>
            </Modal>}
        </>
    )
}

export default ExamFuncrud
