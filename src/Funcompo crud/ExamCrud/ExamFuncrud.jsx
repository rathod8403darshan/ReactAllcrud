import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ExamFuncrud() {
    const [lgShow, setLgShow] = useState(false);

    const [arr, setarr] = useState([]);
    const [img, setimg] = useState("");
    const [obj, setobj] = useState({ skill: [] });
    const [blank, setblank] = useState({ skill: [] });
    let [count, setcount] = useState( 0);



    const show1 = async(e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                obj.skill.push(e.target.value);
            }
            else {
                obj.skill = obj.skill.filter((x) => x !== e.target.value);
            }
            blank.skill = [];
        }
        else if(e.target.type === "file"){
            const file = e.target.files[0];
            obj.profile =     file ?  await toBase64(file) : ""
            setimg(file ?  await toBase64(file) : "");
        }
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

        if(arr && cnt){
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

    }
    return (
        <>

           
{/* 

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Form
            </button> */}

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form action="" className='w-50 mx-auto shadow-lg p-3 mt-3'>
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
                    <input type="file" onChange={show1} name='files'/> <br />
                    <img src={img} alt="" style={{width:"100px", height:"100px"}} />
                </div>

                <button className='btn btn-primary mt-3' type="button" onClick={showData} data-bs-dismiss="modal"> Submit</button>
            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


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
                            <td><img src={x.profile} alt="" style={{width:"50px", height:"50px"}} /></td>
                            <td>{x.fname}</td>
                            <td>{x.pass}</td>
                            <td>{x.mail}</td>
                            <td>{x.date}</td>
                            <td>{x.gender}</td>
                            <td>{x.skill.join(" , ")}</td>
                            <td>
                                <button className='btn btn-danger me-2' onClick={() => deletedata(x.id)}>Delete</button>
                                <button className='btn btn-warning' onClick={() => editdata(x.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" setLgShow={true}>Edit</button>  
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

            
      <Button onClick={() => setLgShow(!lgShow)}>Large modal</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(!lgShow)}
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
                    <input type="file" onChange={show1} name='files'/> <br />
                    <img src={img} alt="" style={{width:"100px", height:"100px"}} />
                </div>

                <button className='btn btn-primary mt-3' type="button" onClick={showData} setLgShow={false}> Submit</button>
            </form></Modal.Body>
      </Modal>
        </>
    )
}

export default ExamFuncrud
