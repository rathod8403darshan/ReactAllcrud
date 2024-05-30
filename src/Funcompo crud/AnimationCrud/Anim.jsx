import React from "react";
import { useState } from "react";
import "./Anim.css";
import Table from "./Table"
import { handleZoomout } from "./ImgFun";

export default function Anime() {
  const [count1, setcount1] = useState("");
  const [className1, setclassName1] = useState("");
  const [height, setHeight] = useState("100vh");
  const [text, setText] = useState("Show table");
  const [new1, setnew1] = useState("");


  const show = () => {
    if (count1 === "") {
      setcount1("anim");
      setclassName1("open");
      setHeight("1000vh");
      setText("Show Form");
      setnew1("reverse-animation");
    } else {
      setHeight("")
      setText("Show Table");
      setcount1("");
      setnew1("");
    }
  };


  window.onload =()=>{
     setcount1("anim");
     setText("Show Form");
     setHeight("1000vh");
  }




  // Form data


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
            obj[e.target.name] = e.target.value ;
            blank[e.target.name] = "";
       }

       setObj({ ...obj });
  }

  const show2 = () => {
       
      if(obj.id){
            const index = arr.findIndex((x)=> x.id === obj.id);
            arr.splice(index,1,obj);
      }
      else{
       count = Math.floor(Math.random()*900 + 100);
       obj.id = count;
       setCount(count);
       setBlank({ ...blank });
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
       let index = arr.findIndex((x)=> x.id === i);
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
      setcount1("");
      setHeight("100vh");
  }


  const toBase64 = file => new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result);
       reader.onerror = reject;
   });

  return (
    <>
      <div id="main">
        <div className="wrapper1"style={{height:height}}>
          <span className={`menu ${className1} bg-black btn btn-primary  text-white`} onClick={show}>{text}</span>

          <div id="main11">
                <div class="cat">
                    <div class="ear ear--left"></div>
                    <div class="ear ear--right"></div>
                    <div class="face">
                    <div class="eye eye--left">
                        <div class="eye-pupil"></div>
                    </div>
                    <div class="eye eye--right">
                        <div class="eye-pupil"></div>
                    </div>
                    <div class="muzzle"></div>
                    </div>
                </div>

                  <form action="" className='w-50 border border-2  ms-auto shadow-lg shadow-light p-4  text-light' style={{height:"100vh"}}>
                    <h1 className='text-center mb-2 fs-2'> Function compo crud</h1>
                    <div>
                         <label htmlFor="">First Name</label> <br />
                         <input type="text" className='w-100 rounded-2  ' name="fname" onChange={Data} value={obj.fname} />
                    </div>
                    <div>
                         <label htmlFor="">Last Name</label> <br />
                         <input type="text" className='w-100 rounded-2  ' name="lname" onChange={Data} value={obj.lname} />
                    </div>
                    <div>
                         <label htmlFor="">Email</label> <br />
                         <input type="text" className='w-100 rounded-2  ' name="email" onChange={Data} value={obj.email} />
                    </div>
                    <div>
                         <label htmlFor="">Password</label> <br />
                         <input type="text" className='w-100 rounded-2  ' name="Password" onChange={Data} value={obj.Password} />
                    </div>
                    <div className='my-2'>
                         <label htmlFor="">Gender : </label><br />
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
                         <img src={img1} alt="" className='ms-3' height={"50px"} />
                    </div>

                    <div className='pt-2'>
                         <button type='button' className='btn btn-primary bg-black mt-2' onClick={show2}>Submit</button>
                    </div>



               </form>

      
     </div>

          <div className={`overlay ${count1} ${new1}`}>
            <ul className="position-relative">
               <Table arr={arr} deletedata={deletedata} editdata={editdata}/>
               <div className="border Zoomimg" style={{cursor:"pointer"}} onClick={handleZoomout}> 
                         <div className="imgDiv"> 

                         </div>
                         <p onClick={handleZoomout}>X</p>
               </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
