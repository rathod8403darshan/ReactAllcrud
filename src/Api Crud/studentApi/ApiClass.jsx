import axios from 'axios';
import React, { Component } from 'react'

export default class ApiClass extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      obj: { hobbies: [] },
      blank: { hobbies: [] },
      popUp: false,
      text: ""
    }
  }


  componentDidMount() {
    this.DetData();
  }

  show = (e) => {
    if (e.target.name === "hobbies") {
      if (e.target.checked) {
        this.state.obj.hobbies.push(e.target.value);
      }
      else {
        this.state.obj.hobbies = this.state.obj.hobbies.filter((x) => x !== e.target.value);
      }
      this.state.blank.hobbies = [];
    }
    else {
      this.state.obj[e.target.name] = e.target.value;
      this.state.blank[e.target.name] = "";
    }
    this.setState({ blank: { ...this.state.blank } });
    this.setState({ obj: { ...this.state.obj } })
  }

  DetData = () => {
    axios.get("https://student-api.mycodelibraries.com/api/student/get").then((res) => {
      this.setState({ arr: [...res.data.data] });
      console.log(this.state.arr);
    })
  }

  Subdata = () => {
    this.setState({ blank: { ...this.state.blank } });

    if (this.state.obj._id === undefined) {
      this.setState({ obj: { ...this.state.obj } })

      axios.post("https://student-api.mycodelibraries.com/api/student/add", this.state.obj).then((res) => {
        this.setState({ popUp: true });
        this.setState({ text: res.data.message });
        this.DetData();
      })
    }
    else {
      try {
        this.state.obj.id = this.state.obj._id
        axios.post("https://student-api.mycodelibraries.com/api/student/update", this.state.obj).then((res) => {
          this.setState({ popUp: true });
          this.setState({ text: res.data.message });
          this.DetData();

          this.state.blank = { firstName: "", lastName: "", age: "", city: "", gender: "", hobbies: [] }
          this.setState({ blank: { ...this.state.blank } })
          this.setState({ obj: { ...this.state.blank } });
        })
      } catch (error) {
        console.log(error);
      }
    }


    this.setState({ obj: this.state.blank });

  }

  deletetdata = (id) => {
    axios.delete("https://student-api.mycodelibraries.com/api/student/delete?id=" + id).then((res) => {
      this.setState({ popUp: true });
      this.setState({ text: res.data.message });
      axios.get("https://student-api.mycodelibraries.com/api/student/get").then((res) => {
        this.setState({ arr: [...res.data.data] })
        console.log(this.state.arr);
      })
    })
  }
  editdata = (id) => {
    console.log(id);
    axios.get("https://student-api.mycodelibraries.com/api/student/get-student-by-id?id=" + id).then((res) => {
      this.setState({ obj: { ...res.data.data, hobbies: res.data.data.hobbies.split(",") } });
      console.log(res);
    })
  }

  render() {
    if (this.state.popUp) {
      setInterval(() => {
        this.setState({ popUp: false });
      }, 3000);
    }
    return (

      <div>
        <div className={` position-absolute end-0 w-25 text-center  alert  bg-success text-white ${this.state.popUp ? 'd-block' : 'd-none '} align-items-center`} role="alert">
          <div>
            {this.state.text}
          </div>
        </div>
        <form action="" className='w-50 mx-auto shadow-lg p-3 my-4'>
          <div className='mt-2'>
            <label htmlFor="">First Name :</label><br />
            <input type="text" name='firstName' className='w-100' onChange={this.show} value={this.state.obj.firstName} />
          </div>
          <div className='mt-2'>
            <label htmlFor="">Last Name :</label><br />
            <input type="text" name='lastName' className='w-100' onChange={this.show} value={this.state.obj.lastName} />
          </div>
          <div className='mt-2'>
            <label htmlFor="">age :</label><br />
            <input type="number" name='age' className='w-100' onChange={this.show} value={this.state.obj.age} />
          </div>
          <div className='mt-2'>
            <label htmlFor="">city :</label><br />
            <input type="text" name='city' className='w-100' onChange={this.show} value={this.state.obj.city} />
          </div>
          <div className='mt-2'>
            <label htmlFor="">Gender : </label><br />
            <input type="radio" className='ms-2' name='gender' value={"male"} onChange={this.show} checked={this.state.obj.gender === "male"} /> Male
            <input type="radio" className='ms-2' name='gender' value={"other"} onChange={this.show} checked={this.state.obj.gender === "other"} /> Female
            <input type="radio" className='ms-2' name='gender' value={"female"} onChange={this.show} checked={this.state.obj.gender === "female"} /> Female

          </div>
          <div className='mt-2'>
            <label htmlFor="">Hobbies : </label><br />
            <input type="checkbox" className='ms-2' name='hobbies' value={"cricket"} onChange={this.show} checked={this.state.obj.hobbies.includes("cricket")} /> cricket
            <input type="checkbox" className='ms-2' name='hobbies' value={"football"} onChange={this.show} checked={this.state.obj.hobbies.includes("football")} /> football
            <input type="checkbox" className='ms-2' name='hobbies' value={"kho-kho"} onChange={this.show} checked={this.state.obj.hobbies.includes("kho-kho")} /> kho-kho
            <input type="checkbox" className='ms-2' name='hobbies' value={"kabaddi"} onChange={this.show} checked={this.state.obj.hobbies.includes("kabaddi")} /> kabaddi
          </div>



          <div className="mt-3">
            <button type='button' className='btn btn-success ' onClick={this.Subdata}>Submit</button>
          </div>
        </form>

        <table className='table table-dark text-center  '>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>age</th>
              <th>city</th>
              <th>Gender</th>
              <th>Skill</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {this.state.arr.map((x, i) => (
              <tr key={i}>
                <td>{x.firstName}</td>
                <td>{x.lastName}</td>
                <td>{x.age}</td>
                <td>{x.city}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies}</td>
                <td>
                  <button className='btn btn-danger me-3' onClick={() => this.deletetdata(x._id)}>Delete</button>
                  <button className='btn btn-warning' onClick={() => this.editdata(x._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
