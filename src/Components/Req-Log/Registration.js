import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './reqlog.css';
axios.defaults.withCredentials = true;
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        name:'', 
        email:'',
        password:''
      },
      confirmPass:'',
      errors:''
    }
  }
  
  submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/registration", this.state.data).then(res=>{
      if(res.data.errors){
       return this.setState({errors:res.data.errors});
      }
      if(res.data.ok){
        return this.setState({success:"Successfully registered", errors:null})
      }
      window.location.href = "/login";
    });
  }

  changeHandler = (e) => {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
        data : formData
    })
  }

  render() {
    return (
      <div>
  
        <div className ="cen">
        <h3 className="">Registration</h3>
      {this.state.success &&<p className="btn-success" >{this.state.success}</p>}
        <form  onSubmit={this.submitHandler}>
            <div className="col">
                <input type="text" onChange={this.changeHandler} name='name' className="form-control name-inp input-group mb-3 col" value={this.state.data.name} placeholder="Name"/>
                {this.state.errors && this.state.errors.name && <p className="text-danger"> {this.state.errors.name.msg}</p>}
                <input type="email" onChange={this.changeHandler} name='email' className="form-control input-group mb-3 col" value={this.state.data.email} placeholder="Email"/>
                {this.state.errors && this.state.errors.email && <p className="text-danger"> {this.state.errors.email.msg}</p>}
                <input type="password" onChange={this.changeHandler} name='password' className="form-control input-group mb-3 col" value={this.state.data.password} placeholder="Password"/>
                {this.state.errors && this.state.errors.password && <p className="text-danger"> {this.state.errors.password.msg}</p>}
                <input type="password" onChange={this.changeHandler} name='confirmPass' className="form-control input-group mb-3 col" value={this.state.data.confirmPass} placeholder="Confirm password"/>
                {this.state.errors && this.state.errors.confirmPass && <p className="text-danger"> {this.state.errors.confirmPass.msg}</p>}
            </div>
                <button type='submit'  className="btn btnss hvr-sweep-to-right  ml-auto">Submit</button>
        </form>
       </div>

      </div>
    )
  }
}