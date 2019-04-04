import React, { Component } from 'react';
import "./Home.css";
import axios from 'axios';
axios.defaults.withCredentials = true;
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      main:"",
      isLoggedIn:true,
    }
    axios.get(process.env.REACT_APP_SECRET_CODE + '/api/session')
    .then((res)=>{this.setState({isLoggedIn:res.data.session})})
  }
  render() {
    return (
      <div>
          <h5>Welcome to our discussion forum. Here you can spend your time talking <br/> about whatever topic you'd like. Please register and start engaging.</h5>
          <div class="contain">         
            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
              <circle cx="170" cy="170" r="145" stroke="#E2007C"/>
              <circle cx="170" cy="170" r="120" stroke="#404041"/>
              <circle cx="170" cy="170" r="95" stroke="#E2007C"/>
              <circle cx="170" cy="170" r="70" stroke="#404041"/>
              <circle cx="170" cy="170" r="50" stroke="#E2007C"/>
             </svg>
          </div>
      </div>
    )
  }
}
