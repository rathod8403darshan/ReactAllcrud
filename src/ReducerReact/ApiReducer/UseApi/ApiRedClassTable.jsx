import React, { Component } from 'react'
import HocReducer from './HocReducer'
import { Link } from 'react-router-dom'

export class ApiRedClassTable extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

     deletetdata = (id)=> {
        this.props.routes.dispatch({type:"DELETE",id:id})
    }
    
    render() {

        return (
            <>


                <table className='table table-dark mt-3'>
                    <thead>
                        <tr>

                            <th>Profile</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>age</th>
                            <th>City</th>
                            <th>gender</th>
                            <th>Hobbies</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                            {this.props.routes.arr?.map((x, i) => (
                                <tr key={i}>
                                    <td><img src={x.image} height={"50"} width={"50"}></img></td>
                                    <td>{x.firstName}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.age}</td>
                                    <td>{x.city}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobbies}</td>
                                    <td className=''>
                                            <button className='btn btn-danger me-3 ' onClick={()=>this.deletetdata(x._id)}>Delete</button>
                                            <Link className='btn btn-warning' to={`/formApi/${x._id}`}>Edit</Link>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                </table>

            </>
        )
    }
}

export default HocReducer(ApiRedClassTable)