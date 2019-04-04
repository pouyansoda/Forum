//Login.js
import React, { Component } from "react";
import axios from "axios";
import './reqlog.css';
import 'bootstrap/dist/css/bootstrap.css';
import './hover.css';
axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        email: "",
        password: ""
      },
      errors: '',
      success:null,
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_SECRET_CODE + "/api/login", this.state.data).then(res => {
      if (res.data.errors) {
        window.location.href = "/register";
        return this.setState({ errors: res.data }); 
      }
      if(res.data.ok){
        return this.setState({success:"Successfully registered", errors:null})
      }
      return this.props.history.push("/home");
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
       <center>
       <div className="loginform cen">
            <h3>sign in</h3>
            {/* {this.state.success &&<p className="btn-danger" >{this.state.success}</p>} */}
            <form onSubmit={this.submitHandler}>
             <div className="form-group">
                    <input onChange={this.changeHandler} value={this.state.data.email} name="email" type="email" className="form-control input-group mb-3 col" placeholder="Email"/>
                     {this.state.errors && this.state.errors.email && <p className="text-danger"> {this.state.errors.email.msg}</p>}   
                    <input onChange={this.changeHandler} value={this.state.data.password} name="password" type="password" className="form-control input-group mb-3 col" placeholder="Password"/>
                    {this.state.errors && this.state.errors.password && <p className="text-danger"> {this.state.errors.password.msg}</p>}
                    <br/>
                <button type="submit" className="btn btnss hvr-sweep-to-right  ml-auto">
                    Sign in
                </button>
             </div>
            </form>
        </div>
       </center>
      </div>
    );
  }
}

export default Login;
