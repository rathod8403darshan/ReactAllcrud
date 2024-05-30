import React, { useEffect, useState } from 'react'
import { BiSolidShow } from "react-icons/bi";
function Crud2() {
    const [arr,setArr] = useState([]);
    const [Img,setImg] = useState("");
    const [obj,setobj] = useState({skill: []});
    const [blank,setblank] = useState({skill: []});
    const [err,seterr] = useState({});
    let   [count,setcount] = useState(0);
    const [showpass,setshowpass] = useState(true);
    const [showcnpass,setcnshowpass] = useState(true);
    const [errArr,seterrArr] = useState([]);
    const [filrterArray,setFilrterArray] = useState([]);
    const [filterObj,setFilterobj] = useState({fname1 : "", gmail1:""});
    const [arr121,setarr121] = useState(false);


    const show = async(e) =>{
        
        
        
        if(e.target.type === "checkbox"){
            if(e.target.checked){
                obj.skill.push(e.target.value)
            }
            else{
                obj.skill = obj.skill.filter((x)=>  x !== e.target.value);
            }
        setobj({...obj});
        blank[e.target.name] = []
        }
        else if(e.target.type === "file"){
            const file = e.target.files[0];
            obj[e.target.name] = file ? await toBase64(file) : ""
            setImg(await toBase64(file));
            e.target.value = "";
        }

    else{
        obj[e.target.name] = e.target.value;
        blank[e.target.name] = "";
    
    }
        setobj({...obj});


        // validation
        if(e.target.name === "fname"){
            if(e.target.value === ""){
                err[e.target.name] = "Name id Required";
            }else if(!(/^[a-zA-Z-" "]*$/.test(e.target.value))){
                err[e.target.name] = "Please enter valid name";
            }
            else{
                err[e.target.name] = " "
            }
        }
        if(e.target.name === "lname"){
            if(e.target.value === ""){
                err[e.target.name] = "lname is Required";
            }else if(!(/^[a-zA-Z-" "]*$/.test(e.target.value))){
                err[e.target.name] = "Please enter valid Last name";
            }
            else{
                err[e.target.name] = " ";
            }
        }
        if(e.target.name === "pass"){
            if(e.target.value === ""){
                err[e.target.name] = "Password is Required";
            }else if(!(/^[a-zA-Z-" "]*$/.test(e.target.value))){
                err[e.target.name] = "Please enter valid Last name";
            }
            else{
                err[e.target.name] = " "
            }
        }

        if(e.target.name === "gender"){
            if(e.target.value !== ""){
                err[e.target.name] = " ";
            }
        }

        if(e.target.name === "skill"){
            if(obj.skill.length===0){
                err[e.target.name] = "Skill is required ";
            }else if(obj.skill.length<3){
                err[e.target.name] = "Min 3 Skill is required ";
            }
            else{
                err[e.target.name] = " ";
            }
        }

        if(e.target.name === "mail"){
            if(e.target.value === ""){
                err[e.target.name] = "Email is required ";
            }
           else if(!(e.target.value.includes("@gmail.com") || e.target.value.includes("@yahoo.com"))){
                err[e.target.name] = "Enter valid mail ";
            }
            else{
                err[e.target.name] = " ";
            }
        }

        if(e.target.name === "pass"){
            if(obj.cpass == undefined || obj.cpass === ""){
                err.cpass = "";
            }
            else if(obj.pass !== obj.cpass) {
                err.cpass = "Your Password is not same";
            }
            else{
                err.cpass = "";
            }

            if(e.target.value === ""){
                err[e.target.name] = "Password is required ";
            }
           else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(e.target.value)) ){
                err[e.target.name] = "Enter valid Password ";
            }
            else{
                err[e.target.name] = " ";
            }
        }

        if(e.target.name === "cpass"){
            if(e.target.value === ""){
                err[e.target.name] = "Password Required";
            }
           else if(e.target.value !== obj.pass){
                err[e.target.name] = "Your Password is not same";
            }
            else{
                err[e.target.name] = " ";
            }
        }

        // Date
        if(e.target.name === "date"){
            let date1 =  new Date();
            let date2 =  new Date(e.target.value);

            let cmpdate =  new Date(date1.getFullYear()-18,date1.getMonth(),date1.getDate());
            // console.log(cmpdate)

            if(e.target.value === ""){
                err[e.target.name] = "Enter valid date";
            }
            else if(date2 >= cmpdate){
                err[e.target.name] = `Minimum age Required is 18`;
            }
            // const total = new Date().getTime()-new Date(e.target.value).getTime();
        //    else if(total<=568025136000){
        //         err[e.target.name] = `Your age is ${Math.floor(total/1000/60/60/24/31/12)} Years and Minimum age Required is 18`;
        //     }
            else{
                err[e.target.name] = " ";
            }
        }


        // console.log(obj.pass)
        if(e.target.name === "number"){
            
            if(e.target.value ===""){
                err[e.target.name] = "number is required";
            }
            else if(!(e.target.value.length === 10)){
               err[e.target.name] = "Enter valid number";
               
            }
            else{
                err[e.target.name] = " ";
            }
        }

        if(e.target.name === "file"){
            if(obj.file !== ""){
                err[e.target.name] = " ";
            }
        }
        seterr({...err});



 }

    useEffect(()=>{
    
       let arr = JSON.parse(localStorage.getItem("arr"))
       let cnt = JSON.parse(localStorage.getItem("cnt"))
       let up = JSON.parse(localStorage.getItem("up"))
       if(arr && cnt && up ){
        setArr(JSON.parse(localStorage.getItem("arr")))
       setcount(JSON.parse(localStorage.getItem("cnt")))
       setblank(JSON.parse(localStorage.getItem("up")))
       setFilrterArray(JSON.parse(localStorage.getItem("arr")))
       }
    },[])
    useEffect(()=>{
        localStorage.setItem("arr",JSON.stringify(arr))
        localStorage.setItem("cnt",JSON.stringify(count))
        localStorage.setItem("up",JSON.stringify(blank));
    },[count,arr,blank])


    const Data = () =>{
        

        if(obj.fname === undefined || obj.fname === ""){
            err.fname = "FirstName is Required";
        }
        if(obj.lname === undefined || obj.lname === ""){
            err.lname = "LastName is Required ";
        }
        if(obj.pass === undefined || obj.pass === ""){
            err.pass = "Password is Required ";
        }
        if(obj.number === undefined || obj.number === ""){
            err.number = "number is Required ";
        }
        if(obj.mail === undefined || obj.mail === ""){
            err.mail = "Email is Required ";
        }
        if(obj.gender === undefined || obj.gender === ""){
            err.gender = "Gender is Required ";
        }
        if(obj.file === undefined || obj.file === ""){
            err.file = "Profile is Required ";
        }
        if(obj.cpass === undefined || obj.cpass === ""){
            err.cpass = "Confirm Password is Required ";
        }
        if(obj.date === undefined || obj.date === ""){
            err.date = "Date is Required ";
        }

        if(obj.skill.length === 0){
            err.skill = "skill is Required";
        }


        for(let x in err){
            errArr.push(err[x]);
            seterrArr([errArr]);
        }
        let arr12 =   errArr.every((x) => x === ' ' || x === "" );
        console.log(arr12);
        console.log(errArr);
        
        if(arr12){
            if(obj.id){
                let obj1 =  arr.findIndex((x)=> x.id === obj.id );
                arr.splice(obj1 ,1 ,obj);
                }
            else{
                count++;
                setcount(count)
                obj.id = count
                setobj({...obj})
                setblank({...blank})
        
                arr.push(obj);
                filrterArray.push(obj);
                }
                
    
            setArr([...arr])
          setFilrterArray([...arr]);
            setImg("");
            setobj(blank);
        }
        
        seterr({...err})

        // e.preventDefault();
        
       

        seterrArr([]);
            
        }


    const deletedata = (id1) =>{
          const ind = arr.findIndex((x) => x.id === id1)
        arr.splice(ind,1)
            setArr([...arr]);
            setFilrterArray([...arr])
    }
    const edidtdata = (id1) =>{
            const ind = arr.find((x) => x.id === id1);
            setImg(ind.file);
            setobj({...ind});

            for(let x in err){
                err[x] = "";
                seterr(err);
                console.log(err);
            }

            
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    

      const showNum = (e) => {
        if(e.key === "e")
          {
            err.number = "Enter valid"
            seterr(err)
          }
      }
     
    //   const show1 = (e) => {
             
        
    //           let objfilter = arr.filter((x)=> x.fname.toLowerCase().includes(e.target.value.toLowerCase()) );
    //           setFilrterArray([...objfilter]);
    //         }
        const show1 = (e) => {
    
            filterObj[e.target.name] = e.target.value
            const filter = arr.filter((x) => x.fname.toLowerCase().includes(filterObj.fname1.toLowerCase()) && x.mail.toLowerCase().includes(filterObj.gmail1.toLowerCase())
            );
            setFilrterArray(filter);
        };
            
            console.log(filrterArray);

            
  return (
    <>

        <form action="" className='w-50 mx-auto shadow-lg p-3 mt-4'>
            <div> 
                <input type='text' name='fname1' placeholder='Enter Name' onChange={show1}></input>
                <input type='text' name='gmail1' placeholder='Enter mail' onChange={show1}></input>
            </div>
            <div>
                <label htmlFor="">First</label>   <br />
                <input type="text" name='fname' className='w-100' onChange={show} value={obj.fname}/><br />
                <div>
                <span className='text-danger'>{err.fname}</span>
                </div>
            </div>
          <div>
                <label htmlFor="">Last</label>  <br/>
                <input type="text" name='lname'  className='w-100' onChange={show} value={obj.lname}/><br />
                <div>
                <span className='text-danger'>{err.lname}</span>
                </div>
          </div>
          <div>
                <label htmlFor="">Date</label>  <br/>
                <input type="date" name='date'  className='w-100' onChange={show} value={obj.date}/><br />
                <div>
                <span className='text-danger'>{err.date}</span>
                </div>
          </div>
           <div>
                 <label htmlFor="">Password</label>  <br />
      
                <div className='row px-2'>
                <input type={showpass ? "password" : "text"}  name='pass' className='col-11 p-0 m-0' onChange={show} value={obj.pass}/>
                <span className='col-1 border border-2 border-dark-subtle  ' onClick={()=>setshowpass(!showpass)}><BiSolidShow className='fs-3 p-0 m-0'/></span>
                 </div>
                <div>
                <span className='text-danger'>{err.pass}</span>
                </div>
           </div>
           <div>
                 <label htmlFor="">Confirm Password</label>  <br />
                 <div className='row px-2'>
                <input type={showcnpass ? "password" : "text"}  name='cpass' className='col-11 p-0 m-0' onChange={show} value={obj.cpass}/>
                <span className='col-1 border border-2 border-dark-subtle' onClick={()=>setcnshowpass(!showcnpass)}><BiSolidShow className='fs-3 p-0 m-0'/></span>
                 </div>
                <div>
                <span className='text-danger'>{err.cpass}</span>
                </div>
           </div>
          <div>
                <label htmlFor="">Gmail</label>  <br />
                <input type="email" name='mail'  className='w-100' onChange={show} value={obj.mail}/>
                <div>
                <span className='text-danger'>{err.mail}</span>
                </div>
          </div>
          <div>
                <label htmlFor="">Number</label>  <br />
                <input type="number" name='number'  className='w-100' onChange={show} value={obj.number} onKeyDown={showNum}/>
                <div>
                    <span className='text-danger'>{err.number}</span>
                </div>
          </div>
           <div>
                   <label htmlFor="">Gender :</label>  <br />
                    <input type="radio" name='gender' className='ms-2 me-2'  value={"male"} onChange={show} checked={obj.gender === "male"}/>male
                    <input type="radio" name='gender' className='ms-2 me-2'  value={"female"} onChange={show} checked={obj.gender === "female"}/>Female
                    <input type="radio" name='gender' className='ms-2 me-2'  value={"other"} onChange={show} checked={obj.gender === "other"}/>other  <div>
                    <span className='text-danger'>{err.gender}</span>
                    </div>
            
            </div> 
            <div>
                    <label htmlFor="">Skill :</label> <br />
                    <input type="checkbox" className='me-2 ms-1' name='skill'  value={"node"} onChange={show} checked={obj.skill.includes("node")} />node
                    <input type="checkbox" className='me-2 ms-1' name='skill'  value={"React"} onChange={show} checked={obj.skill.includes("React")} />React
                    <input type="checkbox" className='me-2 ms-1' name='skill'  value={"Angular"} onChange={show} checked={obj.skill.includes("Angular")} />Angular
                    <input type="checkbox" name='skill' className='me-2 ms-1'  value={"core"} onChange={show} checked={obj.skill.includes("core")} />core  <div>
                    <span className='text-danger'>{err.skill}</span>
                    </div> 
                </div>
                <div>
                    <label htmlFor="">Select file : </label> <br />
                    <input type="file" name='file' onChange={show} style={{width:"110px"}}/>
                    <img src={Img} alt=""style={{width:"50px",height:"50px"}}/>
                    <div>
                    <span className='text-danger'>{err.file}</span>
                    </div> 
                </div>
                <br />
           
            <button className='btn btn-primary' type='button' onClick={Data}>Submit</button>
        </form>


        
        <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Profile</th>
                        <th>Firstname</th>
                        <th>Last name</th>
                        <th>Date</th>
                        <th>Gmail</th>
                        <th>number</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Skill</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {/* {arr.map((x,i)=> (
                       <tr key={i}>
                       <td>{x.id}</td>
                       <td><img src={x.file} alt="" style={{width:"50px",height:"50px"}} /></td>
                       <td>{x.fname}</td>
                       <td>{x.lname}</td>
                       <td>{new Date(x.date).toLocaleDateString()}</td>
                       <td>{x.mail}</td>
                       <td>{x.number}</td>
                       <td>{x.pass}</td>
                       <td>{x.gender}</td>
                       <td>{x.skill.join(" , ")}</td>
                       <td>
                        <button className='btn btn-danger me-2' onClick={()=>deletedata(x.id)} >Delete</button>
                        <button className='btn btn-warning' onClick={()=>edidtdata(x.id)}>Edit</button>
                       </td>
                   </tr>
                   ))} */}
                   { filrterArray.map((x,i)=> (
                       <tr key={i} className='mt-5 '>
                       <td>{x.id}</td>
                       <td><img src={x.file} alt="" style={{width:"50px",height:"50px"}} /></td>
                       <td>{x.fname}</td>
                       <td>{x.lname}</td>
                       <td>{new Date(x.date).toLocaleDateString()}</td>
                       <td>{x.mail}</td>
                       <td>{x.number}</td>
                       <td>{x.pass}</td>
                       <td>{x.gender}</td>
                       <td>{x.skill}</td>
                       <td>
                        <button className='btn btn-danger me-2' onClick={()=>deletedata(x.id)} >Delete</button>
                        <button className='btn btn-warning' onClick={()=>edidtdata(x.id)}>Edit</button>
                       </td>
                   </tr>
                   ))}

                </tbody>
        </table>
    
    </>
  )
}

export default Crud2