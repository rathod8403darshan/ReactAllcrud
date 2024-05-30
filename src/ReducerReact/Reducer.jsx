
import React, { useEffect, useReducer, useState } from "react";
import { ReduceFunc } from "./ReduceFunc";
import "./ReducerCrud.css"

function Reducer() {
  const [obj, setobj] = useState({ hobbies: [] });
  const [blank, setblank] = useState({ fname: " ", lname: " ", pass: "", mail: " ", hobbies: [], gender: "" });
  let [count, setCount] = useState(
    0
  );
  const [state, dispatch] = useReducer(
    ReduceFunc,
    []
  );

  const showdata = async (e) => {
    if (e.target.name === "hobbies") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      } else {
        obj.hobbies = obj.hobbies.filter((x) => x !== e.target.value);
      }
    } else if (e.target.name === "profile") {
      const file = e.target.files[0];
      obj.profile = file ? await toBase64(file) : "";
      e.target.value = "";
    } else {
      obj[e.target.name] = e.target.value;
    }

    setobj({ ...obj });
  };

  const submit = () => {

    console.log(obj);

    if (obj.id) {
      let objid = state.findIndex((x) => x.id == obj.id);
      dispatch({ type: "edit", index: objid, obj });
    } else {
      count++;
      setCount(count);
      obj.id = count;
      setobj({ ...obj });
      dispatch({ type: "add", obj1: obj });
    }

    console.log(state);
    dispatch({ type: "setItem", count: count })
    setobj({ ...blank });
  };


  useEffect(() => {
    dispatch({ type: "mounting", setcount: setCount })
  }, []);

  const deleteData = (id) => {
    let index1 = state.findIndex((x) => x.id == id);
    dispatch({ type: "remove", index: index1 });
  };

  const editData = (id1) => {
    let obj = state.find((x) => x.id == id1);
    setobj({ ...obj });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <>
      {/* <h1>hel = {JSON.stringify(state)}</h1> */}
      {/* <button onClick={()=> dispatch(state+1)} className='btn btn-primary'>Incre</button>
    <button onClick={()=> dispatch(state-1)} className='btn btn-primary'>descre</button>
    <button onClick={()=> dispatch(0)} className='btn btn-primary'>Zero</button> */}

      <div id="reducer">
        <div class="container">
          <div class="card">

            <form className="  p-2 text-white">
              <div className="pb-1 row">
                <label htmlFor="" className="p-0">
                  First Name :
                </label>
                <input
                  type="text"
                  name="fname"
                  id=""
                  onChange={showdata}
                  value={obj.fname}
                />
              </div>
              <div className="pb-1 row">
                <label htmlFor="" className="p-0">
                  Last Name :
                </label>
                <input
                  type="text"
                  name="lname"
                  id=""
                  onChange={showdata}
                  value={obj.lname}
                />
              </div>
              <div className="pb-1 row">
                <label htmlFor="" className="p-0">
                  Password :
                </label>
                <input
                  type="password"
                  name="pass"
                  id=""
                  onChange={showdata}
                  value={obj.pass}
                />
              </div>
              <div className="pb-1 row">
                <label htmlFor="" className="p-0">
                  Email :
                </label>
                <input
                  type="email"
                  name="mail"
                  id=""
                  onChange={showdata}
                  value={obj.mail}
                />
              </div>
              <div className="pb-1 mt-2">
                <label htmlFor="" className="p-0 me-2">
                  Gender :
                </label>
                <input
                  type="radio"
                  className="ms-1 me-2"
                  name="gender"
                  value={"male"}
                  id=""
                  onChange={showdata}
                  checked={obj.gender === "male"}
                />
                Male
                <input
                  type="radio"
                  className="ms-1 me-2"
                  name="gender"
                  value={"female"}
                  id=""
                  onChange={showdata}
                  checked={obj.gender === "female"}
                />
                Female
                <input
                  type="radio"
                  className="ms-1 me-2"
                  name="gender"
                  value={"other"}
                  id=""
                  onChange={showdata}
                  checked={obj.gender === "other"}
                />
                Other
              </div>

              <div className="pb-1 mt-2">
                <label htmlFor="" className="p-0 me-2">
                  Hobbies :
                </label>
                <input
                  type="checkbox"
                  className="ms-1 me-2"
                  name="hobbies"
                  value={"cricket"}
                  id=""
                  onChange={showdata}
                  checked={obj.hobbies.includes("cricket")}
                />
                Cricket
                <input
                  type="checkbox"
                  className="ms-1 me-2"
                  name="hobbies"
                  value={"kho-kho"}
                  id=""
                  onChange={showdata}
                  checked={obj.hobbies.includes("kho-kho")}
                />
                Kho-Kho
                <input
                  type="checkbox"
                  className="ms-1 me-2"
                  name="hobbies"
                  value={"table-tennis"}
                  id=""
                  onChange={showdata}
                  checked={obj.hobbies.includes("table-tennis")}
                />
                table-tennis
                <input
                  type="checkbox"
                  className="ms-1 me-2"
                  name="hobbies"
                  value={"kabaddi"}
                  id=""
                  onChange={showdata}
                  checked={obj.hobbies.includes("kabaddi")}
                />
                kabaddi
              </div>

              <div className="pb-1 mt-2">
                <label htmlFor="" className="p-0 me-2">
                  Profile :
                </label>
                <input type="file" name="profile" id="" onChange={showdata} />
              </div>

              <button
                className="btn btn-primary  ms-0 mt-3 my-3 rounded-2"
                type={"button"}
                onClick={submit}
              >
                Submit
              </button>
            </form>


          </div>
          <div class="blob"></div>
        </div>
      </div>



      <table className="table w-100 text-white table-light" >
        <thead >
          <tr >
            <th className="bg-primary text-white ">id</th>
            <th className="bg-primary text-white ">Profile</th>
            <th className="bg-primary text-white ">First Name</th>
            <th className="bg-primary text-white ">Last Name</th>
            <th className="bg-primary text-white ">Password</th>
            <th className="bg-primary text-white ">Email</th>
            <th className="bg-primary text-white ">Gender</th>
            <th className="bg-primary text-white ">Hobbies</th>
            <th className="bg-primary text-white ">Action</th>
          </tr>
        </thead>
        <tbody className="align-baseline">
          {state?.map((x, i) => (
            <tr key={i}>
              <td>{x.id}</td>
              <td>
                <img
                  src={x.profile}
                  style={{ height: "50px", width: "50px" }}
                ></img>
              </td>
              <td>{x.fname}</td>
              <td>{x.lname}</td>
              <td>{x.pass}</td>
              <td>{x.mail}</td>
              <td>{x.gender}</td>
              <td>{x.hobbies.join("  , ")}</td>
              <td className=" ">
                <button
                  className="btn btn-danger me-1"
                  onClick={() => deleteData(x.id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-warning "
                  onClick={() => editData(x.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reducer;
