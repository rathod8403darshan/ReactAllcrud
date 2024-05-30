import React, { Component } from 'react'
import HocReducer from './HocReducer'
import axios from 'axios'

export class ApiRedClassForm extends Component {
    constructor(){
        super()
        this.state={
            obj:{hobbies:[]},
            blank:{firstName:"",lastName:"",age:"",gender:"",city:"",hobbies:[]}
        }
    }

    componentDidMount(){
        if(this.props.routes.params.id1){
            axios.get("https://student-api.mycodelibraries.com/api/user/get-user-by-id?id="+this.props.routes.params.id1).then((response) => {
                this.setState({obj:{...response.data.data,hobbies:response.data.data.hobbies.split(",")}})
            })
        }
    }

    show=(e)=> {
        if(e.target.name === "hobbies"){
            if(e.target.checked){
              this.state.obj.hobbies.push(e.target.value);
            }
            else{
              this.state.obj.hobbies =  this.state.obj.hobbies.filter((x)=> x !== e.target.value)
            }
            this.state.blank[e.target.name] = []
          }else if(e.target.name === "image"){
              this.state.obj[e.target.name] = e.target.files[0]
          }
          else{
              this.state.obj[e.target.name] = e.target.value;
              this.state.blank[e.target.name] = "";
          }
          this.setState({obj:{...this.state.obj}});
    }

    Data=()=> {
           
        const formData1 = new FormData();
        formData1.append("firstName",this.state.obj.firstName);
        formData1.append("lastName",this.state.obj.lastName );
        formData1.append("age",this.state.obj.age );
        formData1.append("hobbies",this.state.obj.hobbies);
        formData1.append("gender",this.state.obj.gender );
        formData1.append("city",this.state.obj.city  );
        formData1.append("userImage",this.state.obj.image );
        

        if(this.props.routes.params.id1){
            formData1.append("id",this.state.obj._id );
            this.props.routes.dispatch({type:"update",objup:formData1});

            setTimeout(() => {
                this.props.routes.navigate("/tableApi");
            }, 500);
            console.log( this.props.routes)

        }
        else{
            this.props.routes.dispatch({type:"ADD",obj:formData1})
        }

        this.setState({obj:{...this.state.blank}});
    }

  render() {
    return (
      <>
           <form action="" className='mx-auto w-50 mb-4 shadow-lg p-4 mt-4 bg-dark  text-white'>

<div>
    <label htmlFor="">First Name :</label>   <br />
    <input type="text" name='firstName' className='w-100' onChange={this.show}  value={this.state.obj.firstName}/><br />

</div>
<div>
    <label htmlFor="">Last Name :</label>  <br />
    <input type="text" name='lastName' className='w-100' onChange={this.show}  value={this.state.obj.lastName}/><br />

</div>

<div>
    <label htmlFor="">age :</label>  <br />
    <input type="number" name='age' className='w-100' onChange={this.show}   value={this.state.obj.age}/>

</div>
<div>
    <label htmlFor="">city ;</label>  <br />
    <input type="text" name='city' className='w-100' onChange={this.show}   value={this.state.obj.city}/>

</div>
<div>
    <label htmlFor="">Gender :</label><br/>
    <input type="radio" name='gender' className='ms-2 me-2' value={"male"} onChange={this.show} checked={this.state.obj.gender === "male"}/>male
    <input type="radio" name='gender' className='ms-2 me-2' value={"female"} onChange={this.show} checked={this.state.obj.gender === "female"}/>Female
    <input type="radio" name='gender' className='ms-2 me-2' value={"other"} onChange={this.show}  checked={this.state.obj.gender === "other"}/>other
</div>
<div>
    <label htmlFor="">Hobbies :</label>  <br />
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"cricket"} onChange={this.show} checked={this.state.obj.hobbies.includes("cricket")}/>Cricket
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"football"} onChange={this.show}  checked={this.state.obj.hobbies.includes("football")}/>football
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kho-kho"} onChange={this.show}   checked={this.state.obj.hobbies.includes("kho-kho")}/>kho kho
    <input type="checkbox" name='hobbies' className='ms-2 me-2' value={"kabaddi"} onChange={this.show}  checked={this.state.obj.hobbies.includes("kabaddi")}/>kabaddi
</div>

<div>
    <label htmlFor="">Profile :</label>  <br />
    <input type="file" name='image' className='w-100' onChange={this.show}  />

</div>


<br />

<button className='btn btn-primary' type='button' onClick={this.Data}>Submit</button>
</form>
      </>
    )
  }
}

export default HocReducer(ApiRedClassForm)