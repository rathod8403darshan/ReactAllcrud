import axios from 'axios';
import React, { Component } from 'react'

export default class ApiClass extends Component {
    constructor() {
        super();
        this.state = {
            arr: [],
            obj: {},
            blank: {},
            popUp: false,
            text:""
        }
    }


   
    componentDidMount() {
        this.FetchData();
    }

    FetchData = () => {
        axios.get("https://student-api.mycodelibraries.com/api/product/get").then((res) => {
            this.setState({ arr: [...res.data.data] })
        })
    }

  

    show = (e) => {
        this.state.obj[e.target.name] = e.target.value;
        this.state.blank[e.target.name] = "";

        this.setState({ obj: { ...this.state.obj } })
        this.setState({ blank: { ...this.state.blank } })
    }
    Data = () => {

        this.setState({ obj: { ...this.state.obj } })
       if(this.state.obj._id === undefined){
        axios.post("https://student-api.mycodelibraries.com/api/product/add", this.state.obj).then((res) => {
            console.log(res.data);
           this.setState({popUp : true})
           this.setState({text : res.data.message})
            this.FetchData();  
        })

       }
       else{
           this.state.obj.id = this.state.obj._id
            axios.post("https://student-api.mycodelibraries.com/api/product/update",this.state.obj).then((res)=> {
                this.setState({popUp : true})
                this.setState({text : res.data.message})
                 this.FetchData();  
            })

       }
        this.setState({ obj: this.state.blank });

    }

      deletetdata = (id) => {
        axios.delete("https://student-api.mycodelibraries.com/api/product/delete?id="+id).then((res)=> {
            this.setState({popUp : true})
            this.setState({text : res.data.message})
            this.FetchData();
        })
      }
      editdata = (id) => {
        axios.get("https://student-api.mycodelibraries.com/api/product/get-product-by-id?id="+id).then((res)=> {
          this.setState({obj : {...res.data.data}});
        })
      }

   

    render() {
        if (this.state.popUp){
            setInterval(()=>{
                this.setState({popUp:false})
            },3000);
        }
        return (
           <>
             <div>
               {this.state.popUp && <div className={` position-absolute end-0 w-25 text-center alert  bg-success text-white align-items-center`} role="alert">
                    <div>
                       {this.state.text}    
                    </div>
                </div>}
                <form action="" className='mx-auto w-50 mb-4 shadow-lg p-3 mt-4'>

                    <div>
                        <label htmlFor="">category</label>   <br />
                        <input type="text" name='category' className='w-100' onChange={this.show} value={this.state.obj.category} /><br />

                    </div>
                    <div>
                        <label htmlFor="">productName</label>  <br />
                        <input type="text" name='productName' className='w-100' onChange={this.show} value={this.state.obj.productName} /><br />

                    </div>

                    <div>
                        <label htmlFor="">price</label>  <br />
                        <input type="number" name='price' className='w-100' onChange={this.show} value={this.state.obj.price} />

                    </div>
                    <div>
                        <label htmlFor="">clothSize</label>  <br />
                        <input type="text" name='clothSize' className='w-100' onChange={this.show} value={this.state.obj.clothSize} />

                    </div>
                    <div>
                        <label htmlFor="">inStock</label>  <br />
                        <input type="text" name='inStock' className='w-100' onChange={this.show} value={this.state.obj.inStock} />
                    </div>
                    <div>
                        <label htmlFor="">description</label>  <br />
                        <input type="text" name='description' className='w-100' onChange={this.show} value={this.state.obj.description} />
                    </div>
                   

                    <br />

                    <button className='btn btn-primary' type='button' onClick={this.Data}>Submit</button>
                </form>

                <table className='table table-dark'>
                    <thead>
                        <tr>

                            <th>category</th>
                            <th>productName</th>
                            <th>price</th>
                            <th>clothSize</th>
                            <th>inStock</th>
                            <th>description</th>
                      
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arr.map((x, i) => (
                            <tr key={i}>
                                <td>{x.category}</td>
                                <td>{x.productName}</td>
                                <td>{x.price}</td>
                                <td>{x.clothSize}</td>
                                <td>{x.inStock}</td>
                                <td>{x.description}</td>
                               
                                <td>
                                    <button className='btn btn-danger me-3' onClick={() => this.deletetdata(x._id)}>Delete</button>
                                    <button className='btn btn-warning' onClick={() => this.editdata(x._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           </>
        )
    }
}
