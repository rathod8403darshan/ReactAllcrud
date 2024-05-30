import "./First1.css"
import React, { useContext } from "react";
import { Creatcontext1 } from "./PerentFirst";
import { ImgZoom } from "./ImgFunc";

function First() {
  const value = useContext(Creatcontext1);
  console.log(value);

  const deletedata = (id1) => {
    const index = value.arr.findIndex((x) => x.id === id1)
    value.arr.splice(index, 1);
    value.setArr([...value.arr]);
    localStorage.setItem("arr2",JSON.stringify(value.arr));
    localStorage.setItem("count2",JSON.stringify(value.count));
  }


  const editdata = (id1) => {
     const obj2 = value.arr.find((x) => x.id === id1);
     value.setImg(obj2.profile);
     value.setObj({ ...obj2 });
     localStorage.setItem("arr2",JSON.stringify(value.arr));
     localStorage.setItem("count2",JSON.stringify(value.count));
  }

  return (
    <div id='main12 pt-5'>
      <main className="container pt-5 " id="containerCard">
    <div className='row g-2'>
   {/* <div className='col-4'>
   <section className="card  pt-3">
    <div className="product-image">
      <img id='img1' src="https://i.ibb.co/cNWqxGx/red.png" alt="OFF-white Red Edition" draggable="false" />
    </div>
    <div className="product-info">
      <h2>Nike X OFF-white</h2>
      <p>The 10: Air Jordan 1 off-white - Chicago</p>
      <div className="price">$999</div>
    </div>
    <div className="btn">
      <button className="buy-btn">Buy Now</button>
     
      <button className="fav">
        <svg className="svg" id="i-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
        </svg>
      </button>
    </div>
  </section>

   </div>
   <div className="col-4">
   <section className="card  card-blue">
    <div className="product-image">
      <img id='img1' src="https://i.ibb.co/0JKpmgd/blue.png" alt="OFF-white Blue Edition" draggable="false" />
    </div>
    <div className="product-info">
      <h2>Nike X OFF-white</h2>
      <p>Air Jordan 1 Retro High "Off-White - UNC" sneakers</p>
      <div className="price">$1599</div>
    </div>
    <div className="btn">
      <button className="buy-btn">Buy Now</button>
      <button className="fav">
        <svg className="svg" id="i-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
        </svg>
      </button>
    </div>
  </section>
   </div> */}
    {value.arr.map((x,i)=> { return(
   <div className='col-4' key={i}>
        <section className="card " style={{backgroundColor: i%2!=0 ? "#00003f" : "rgba(118, 74, 166, 1)"}}>
        <div className="product-image pb-4">
          <img id='img1' className="mt-1 w-100" onClick={()=>ImgZoom(x.profile)} src={x.profile} alt="OFF-white Blue Edition" draggable="false" />
        </div>
        <div className="product-info">
          <h2>{x.fname}</h2>
          <p>{x.decri}</p>
          <div className="price">${x.num}</div>
        </div>
        <div className="btn d-flex">
          <button className="buy-btn">Buy Now</button>
          <button className="fav">
            <svg className="svg" id="i-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
            </svg>
          </button>
        </div>
          <div className="justify-content-between d-flex">
          <button className="btn btn-danger" onClick={() => deletedata(x.id)}> Delete</button>
                      <button className="btn btn-success" onClick={() => editdata(x.id)}>Edit</button>
          </div>
      </section>
   </div>)
    })}

    </div>
</main>
    </div>
  )
}

export default First
