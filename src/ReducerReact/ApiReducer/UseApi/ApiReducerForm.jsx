import React, { useEffect, useReducer, useState } from "react";
import HocReducer from "./HocReducer";
import { ReducerAPiFun } from "./ReducerAPiFun";
import { useParams } from "react-router";
import axios from "axios";

function ApiReducerForm() {
    const [obj, setObj] = useState({hobbies:[]});
   
    let [blank, setBlank] = useState({firstName:"",lastName:"",age:"",gender:"",city:"",hobbies:[]});
    let { id1 } = useParams();
    const [state, dispatch] = useReducer(ReducerAPiFun,[]);

    useEffect(() => {
        if(id1){
            axios.get("https://student-api.mycodelibraries.com/api/user/get-user-by-id?id="+id1).then((response) => {
                setObj({...response.data.data,hobbies:response.data.data.hobbies.split(",")})
            })
        }
    }, [id1])

    const show = (e) => {
        if(e.target.name === "hobbies"){
          if(e.target.checked){
            obj.hobbies.push(e.target.value);
          }
          else{
            obj.hobbies =  obj.hobbies.filter((x)=> x !== e.target.value)
          }
          blank[e.target.name] = []
        }else if(e.target.name === "image"){
            obj[e.target.name] = e.target.files[0]
        }
        else{
            obj[e.target.name] = e.target.value;
        }
        setObj({...obj});
    }
    const Data = () => {
        
        const formData1 = new FormData();
        formData1.append("firstName",obj.firstName);
        formData1.append("lastName",obj.lastName );
        formData1.append("age",obj.age );
        formData1.append("hobbies",obj.hobbies);
        formData1.append("gender",obj.gender );
        formData1.append("city",obj.city  );
        formData1.append("userImage",obj.image );
        
        // for(let x of formData1.entries()){
            //     console.log(x);
            // }
            if(obj._id){
            formData1.append("id",obj._id );
            dispatch({type:"update",objup:formData1});
        }
        else{
            dispatch({type:"ADD",obj:formData1})
        }
        
        
      setBlank({...blank})
        setObj({...blank});
    }
    
  return (
    <div>
        <form action="" className='mx-auto w-50 mb-4 shadow-lg p-4 mt-4 bg-dark  text-white'>

<div>
    <label htmlFor="">First Name :</label>   <br />
    <input type="text" name='firstName' className='w-100' onChange={show}  value={obj.firstName}/><br />

</div>
<div>
    <label htmlFor="">Last Name :</label>  <br />
    <input type="text" name='lastName' className='w-100' onChange={show}  value={obj.lastName}/><br />

</div>

<div>
    <label htmlFor="">age :</label>  <br />
    <input type="number" name='age' className='w-100' onChange={show}   value={obj.age}/>

</div>
<div>
    <label htmlFor="">city ;</label>  <br />
    <input type="text" name='city' className='w-100' onChange={show}   value={obj.city}/>

</div>
<div>
    <label htmlFor="">Gender :</label><br/>
    <input type="radio" name='gender' className='ms-2 me-2' value={"male"} onChange={show} checked={obj.gender === "male"}/>male
    <input type="radio" name='gender' className='ms-2 me-2' value={"female"} onChange={show} checked={obj.gender === "female"}/>Female
    <input type="radio" name='gender' className='ms-2 me-2' value={"other"} onChange={show}  checked={obj.gender === "other"}/>other
</div>
<div>
    <label htmlFor="">Hobbies :</label>  <br />
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"cricket"} onChange={show} checked={obj.hobbies.includes("cricket")}/>Cricket
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"football"} onChange={show}  checked={obj.hobbies.includes("football")}/>football
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kho-kho"} onChange={show}   checked={obj.hobbies.includes("kho-kho")}/>kho kho
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kabaddi"} onChange={show}  checked={obj.hobbies.includes("kabaddi")}/>kabaddi
</div>

<div>
    <label htmlFor="">Profile :</label>  <br />
    <input type="file" name='image' className='w-100' onChange={show}  />

</div>


<br />

<button className='btn btn-primary' type='button' onClick={Data}>Submit</button>
</form>
    </div>
  );
}

export default HocReducer(ApiReducerForm);
