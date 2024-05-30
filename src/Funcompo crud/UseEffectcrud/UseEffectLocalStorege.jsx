import React, { useEffect, useState } from "react";



function Functioncompocrud() {
  const [img1, setImg1] = useState("")
  const [obj, setobj] = useState({ hobbies: [] });
  const [blankobj, setblankobj] = useState({ hobbies: [] })
  let [err, setErr] = useState({});
  let [arr, setarr] = useState([]);
  let [count, setcount] = useState(0);



  useEffect(() => {
    if(JSON.parse(localStorage.getItem("arr")) && JSON.parse(localStorage.getItem("count"))){
        setarr(JSON.parse(localStorage.getItem("arr")));
        setcount(JSON.parse(localStorage.getItem("count")));
    }
   
  }, []);

  useEffect(() => {
    localStorage.setItem("arr", JSON.stringify(arr));
    localStorage.setItem("count", JSON.stringify(count));
  }, [count,arr]);


  const getData = async (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      }
      else {
        obj.hobbies = obj.hobbies.filter((x) => x !== e.target.value);
      }
      blankobj.hobbies = [];
    }
    else if (e.target.type === "file") {
      let profile = e.target.files[0];
      obj[e.target.name] = await toBase64(profile);
      setImg1(await toBase64(profile));
      blankobj.profile = "";
      e.target.value = "";
    }
    else {
      obj[e.target.name] = e.target.value
      blankobj[e.target.name] = ''
    }


    if(e.target.name === "fname"){
       if(e.target.value === ""){
        err[e.target.name] ="Please enter name"
       }
       else if(!(/^[a-zA-Z]*$/.test(e.target.value))){
        err[e.target.name] ="Please enter valid Name"
       }
       else{
        err[e.target.name] = ""
       }
    }
    if(e.target.name === "lname"){
       if(e.target.value === ""){
        err[e.target.name] ="Please enter name"
       }
       else if(!(/^[a-zA-Z]*$/.test(e.target.value))){
        err[e.target.name] ="Please enter valid Name"
       }
       else{
        err[e.target.name] = ""
       }
    }

    if(e.target.name === "email"){
       if(e.target.value === ""){
        err[e.target.name] ="Please enter mail"
       }
       else if(!(e.target.value.includes("@gmail.com") || e.target.value.includes("@Yahoo.com"))){
        err[e.target.name] ="Please enter valid mail"
       }
       else{
        err[e.target.name] = ""
       }
    }
    

    setErr(err);

    setobj({ ...obj });
  }

  const addData = () => {

  

    if (obj.id) {
      const index = arr.findIndex((x) => x.id === obj.id)
      arr.splice(index, 1, obj);
    }
    else {
      count++;
      setcount(count)
      arr.push(obj)
      obj.id = count;
      setobj({ ...obj })
      setblankobj({ ...blankobj })
    }
    
    setarr([...arr])

    setobj(blankobj);


    setImg1("");
    setErr(err);
  }


  const deldata = (id1) => {
    if (window.confirm("Are you sure to delet row")) {
      let index = arr.findIndex((x) => x.id === id1);
      arr.splice(index, 1);
      setarr([...arr])
    }
  }

  const editdata = (index) => {
    let editobj = arr.find((x) => x.id === index);
    setImg1(editobj.profile)
    setobj({ ...editobj });
  }


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  return (
    <>
      <div className="w-50 shadow-lg bg-dark text-light p-3 m-auto">
        <form action="" >
          <label htmlFor="">First Name</label> <br />
          <input className="w-100" type="text" name="fname" onChange={getData} value={obj.fname} />
            <span className="text-danger">{err.fname}</span>
          <br />
          <label htmlFor="">Last Name</label>
          <br />
          <input className="w-100" type="text" name="lname" onChange={getData} value={obj.lname} />
          <span className="text-danger">{err.lname}</span>
          <br />
          <label htmlFor="">Email</label>
          <br />
          <input className="w-100" type="email" name="email" onChange={getData} value={obj.email} />
          <span className="text-danger">{err.email}</span>
          <br />
          <label htmlFor="">Date</label>
          <br />
          <input className="w-100" type="date" name="date" onChange={getData} value={obj.date} />
          <br />
          <label htmlFor="">Gender</label>
          <br />
          <input type="radio" name="gender" value={"male"} onChange={getData} checked={obj.gender === "male"} />
          Male
          <input type="radio" name="gender" value={"female"} onChange={getData} checked={obj.gender === "female"} />
          Female
          <br />
          <label htmlFor="" className="my-3 me-4">File :</label>
          <button className="btn btn-success" type="button">
            <input type="file" className="" name="profile" onChange={getData} accept={obj.profile} /></button> <br />
          <img src={img1} alt="" width={"80px"} />
          <br />
          <label htmlFor="">Hobbies</label>
          <br />
          <input type="checkbox" name="hobbies" value={"reading"} onChange={getData} checked={obj.hobbies.includes("reading")} />
          Reading
          <input type="checkbox" name="hobbies" value={"tarveling"} onChange={getData} checked={obj.hobbies.includes("tarveling")} />
          Traveling
          <input type="checkbox" name="hobbies" value={"playing"} onChange={getData} checked={obj.hobbies.includes("playing")} />
          Palying
          <input type="checkbox" name="hobbies" value={"gaming"} onChange={getData} checked={obj.hobbies.includes("gaming")} />
          Gaming
          <br />

          <button type="button" onClick={addData} className="btn btn-info mt-3">Submit</button>
        </form>
      </div>

      <table className="table table-dark mt-3 ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            arr.map((x, i) => {
              return <tr key={i}>
                <td>{x.id}</td>
                <td><img src={x.profile} alt="" width={"100px"} /></td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.date}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies?.join(",")}</td>
                <td>
                  <button onClick={() => deldata(x.id)} className="btn btn-danger">Delete</button>
                  <button className="btn btn-warning ms-2" onClick={() => editdata(x.id)}  >Edit</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Functioncompocrud;
