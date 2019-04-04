import React, { Component } from 'react';
import axios from 'axios';
import {Redirect , Link } from 'react-router-dom';
import './user-style.css'
axios.defaults.withCredentials = true;


export default class AllUsers extends Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            sessionUser:true,
        }
    }
    componentDidMount = () => {
        axios.get(process.env.REACT_APP_SECRET_CODE + '/api/session' ) 
        .then(res => {
          if(res.statusCode === 401) return window.location = "/login";
          this.setState({sessionUser: res.data.session})
        })
        axios.get(process.env.REACT_APP_SECRET_CODE + "/api/getAllUsers")
       .then(req=>{
        if(req.statusCode === 401){ return window.location = "/login";}
          this.setState({users: req.data }) 
          
          }).catch((err)=>{
              console.log(err)
          })
      }

  render() {
    return (
        (this.state.sessionUser) ? 
      <div>
      <h4>Users</h4>
         {this.state.users &&
          this.state.users.map(user => {
            return (
              <div  key={user._id} className="users-name" >
              <Link to={ `getAllPostsOneUser/${user._id}`}><p>{user.name}</p></Link>
              </div>
          );
        })}
      </div>
       :
       <Redirect to='/' />
    )
  }
}
