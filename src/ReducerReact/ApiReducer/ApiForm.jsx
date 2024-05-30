import React, { useEffect, useReducer, useState } from "react";
import { ApiFun } from "./ApiFun";

function ApiForm() {
    const [obj, setobj] = useState({ hobbies: [] });
    const [blank, setblank] = useState({ hobbies: [] });
    const [state, dispatch] = useReducer(ApiFun, []);

    const showdata = async (e) => {
        if (e.target.name === "hobbies") {
            if (e.target.checked) {
                obj.hobbies.push(e.target.value);
            } else {
                obj.hobbies = obj.hobbies.filter((x) => x !== e.target.value);
            }
            blank.hobbies = [];
        } else {
            obj[e.target.name] = e.target.value;
            blank[e.target.name] = "";
        }

        setobj({ ...obj });
    };

    const submit = () => {
        setblank({ ...blank });

        setobj({ ...blank });
    };





    useEffect(() => {
        dispatch({ type: "mounting" });
    }, []);




    console.log(state)

    const deleteData = (id) => {
        // let index1 = arr.findIndex((x) => x._id == id);
    };

    const editData = (id1) => {
        // let obj = state.find((x) => x.id == id1);
        // setobj({ ...obj });
    };



    return (
        <>
            <div id="reducer">
                <div className="container">
                    <div className="card">
                        <form className="  p-2 text-white">
                            <div className="pb-1 row">
                                <label htmlFor="" className="p-0">
                                    First Name :
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id=""
                                    onChange={showdata}
                                    value={obj.firstName}
                                />
                            </div>
                            <div className="pb-1 row">
                                <label htmlFor="" className="p-0">
                                    Last Name :
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id=""
                                    onChange={showdata}
                                    value={obj.lastName}
                                />
                            </div>

                            <div className="pb-1 row">
                                <label htmlFor="" className="p-0">
                                    city :
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id=""
                                    onChange={showdata}
                                    value={obj.city}
                                />
                            </div>

                            <div className="pb-1 row">
                                <label htmlFor="" className="p-0">
                                    age :
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    id=""
                                    onChange={showdata}
                                    value={obj.age}
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
                    <div className="blob"></div>
                </div>
            </div>



            <table className="table w-100 text-white table-light">
                <thead>
                    <tr>
                        <th className="bg-primary text-white ">First Name</th>
                        <th className="bg-primary text-white ">Last Name</th>
                        <th className="bg-primary text-white ">City</th>
                        <th className="bg-primary text-white ">Age</th>
                        <th className="bg-primary text-white ">Gender</th>
                        <th className="bg-primary text-white ">Hobbies</th>
                        <th className="bg-primary text-white ">Action</th>
                    </tr>
                </thead>
                <tbody className="align-baseline">
                    {/* {state?.map((x, i) => (
            <tr key={i}>
              <td>{x.firstName}</td>
              <td>{x.lastName}</td>
              <td>{x.city}</td>
              <td>{x.age}</td>
              <td>{x.gender}</td>
              <td>{x.hobbies}</td>
              <td className=" ">
                <button
                  className="btn btn-danger me-1"
                  onClick={() => deleteData(x._id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-warning "
                  onClick={() => editData(x._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))} */}
                </tbody>
            </table>
        </>
    );
}

export default ApiForm;
