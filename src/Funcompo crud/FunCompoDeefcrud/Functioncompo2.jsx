import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import Table from './Table';

function Functioncompo2() {

     const [obj, setObj] = useState({ tech: [] });
     let [arr, setArr] = useState( JSON.parse(localStorage.getItem("arr1"))|| []);
     let [count, setCount] = useState(JSON.parse(localStorage.getItem("count1")) || 0);
     const [blank, setBlank] = useState({ tech: [] })
     const [img1,setImg1] = useState("")


     const Data = async(e) => {

          if (e.target.type === "checkbox") {

               if (e.target.checked) {
                    obj.tech.push(e.target.value)
                    // console.log(obj.tech)
               }
               else {
                    obj.tech = obj.tech.filter((x) => x !== e.target.value)
               }


               blank.tech = []

          }
          else if(e.target.type === "file"){
               let file1 = e.target.files[0]
             obj[e.target.name] =  await toBase64(file1); 
             e.target.value = "";
             setImg1(await toBase64(file1));
          }
          else {
               obj[e.target.name] = e.target.value
               blank[e.target.name] = "";
          }

          setObj({ ...obj })
     }

     const show = () => {
          
         if(obj.id){
               const index = arr.findIndex((x)=> x.id === obj.id);
               arr.splice(index,1,obj);
         }
         else{
          count++;
          obj.id = count;
          setCount(count);
          setBlank({ ...blank })
          setObj({ ...obj })
          arr.push(obj);
         }


          
          
          
          setArr([...arr]);
          localStorage.setItem("arr1",JSON.stringify(arr));
          localStorage.setItem("count1",JSON.stringify(count));
          setObj(blank);
          setImg1("");
     }


     const deletedata = (i) =>{
          let index = arr.findIndex((x)=> x.id === i)
          arr.splice(index,1);
          localStorage.setItem("arr1",JSON.stringify(arr));
          localStorage.setItem("count1",JSON.stringify(count));
          setArr([...arr]);
     }

     const editdata = (i) =>{
          let index = arr.find((x)=> x.id === i)
          setObj({...index});
          localStorage.setItem("arr1",JSON.stringify(arr));
          localStorage.setItem("count1",JSON.stringify(count));
          setImg1(index.profile);
     }


     const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
      });
     return (
          <>

               <form action="" className='w-50 mx-auto shadow-lg p-3 mb-4'>
                    <h1 className='text-center mb-2 fs-2'>Login Form</h1>
                    <div>
                         <label htmlFor="">First Name</label> <br />
                         <input type="text" className='w-100' name="fname" onChange={Data} value={obj.fname} />
                    </div>
                    <div>
                         <label htmlFor="">Last Name</label> <br />
                         <input type="text" className='w-100' name="lname" onChange={Data} value={obj.lname} />
                    </div>
                    <div>
                         <label htmlFor="">Email</label> <br />
                         <input type="text" className='w-100' name="email" onChange={Data} value={obj.email} />
                    </div>
                    <div>
                         <label htmlFor="">Password</label> <br />
                         <input type="text" className='w-100' name="Password" onChange={Data} value={obj.Password} />
                    </div>
                    <div className='my-2'>
                         <label className='main22' htmlFor="">Gender : </label><br />
                         <input type="radio" name='gender' className='me-2' value={"male"} onChange={Data} checked={obj.gender === "male"} />Male  <br />
                         <input type="radio" name='gender' className='me-2' value={"Female"} onChange={Data} checked={obj.gender === "Female"} />Female  <br />
                         <input type="radio" name='gender' className='me-2' value={"Other"} onChange={Data} checked={obj.gender === "Other"} />Other  <br />
                    </div>

                    <div className='my-2'>
                         <label htmlFor="">Technology : </label> <br />
                         <input type="checkbox" className='me-2 ' name='Technology' value={"React-js"} onChange={Data} checked={obj.tech.includes("React-js")} />React-js <br />
                         <input type="checkbox" className='me-2 ' name='Technology' value={"Node-js"} onChange={Data} checked={obj.tech.includes("Node-js")} />Node-js <br />
                         <input type="checkbox" className='me-2 ' name='Technology' value={"Angular"} onChange={Data} checked={obj.tech.includes("Angular")} />Angular <br />
                         <input type="checkbox" className='me-2 ' name='Technology' value={"js"} onChange={Data} checked={obj.tech.includes("js")} />js <br />
                    </div>
                    <div>
                         <label htmlFor="" className='me-2'>File</label>
                         <input type="file" name='profile' onChange={Data}/> 
                         <img src={img1} alt="" className='ms-3' height={"100px"} />
                    </div>

                    <div className='pt-2'>
                         <button type='button' className='btn btn-primary' onClick={show}>Submit</button>
                    </div>



               </form>

           <Table arr={arr} deletedata={deletedata} editdata={editdata}/>

          </>
     )
}

export default Functioncompo2
