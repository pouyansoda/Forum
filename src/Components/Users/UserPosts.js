import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './user-style.css'
axios.defaults.withCredentials = true;

export default class UserPost extends Component {
    constructor(props){
        super(props);
        this.state = {
          userspost:[],
          sessionUser:true,
          user:this.props.username,
          post:[]
        }
    }
    componentDidMount = () => {
      axios.get(process.env.REACT_APP_SECRET_CODE + "/api/session" ) 
      .then(res => {
        if(res.statusCode === 401) return window.location = "/login";
        this.setState({sessionUser: res.data.session})
      })
      axios.get(process.env.REACT_APP_SECRET_CODE + "/api/getAllArticles")
      .then(res => {
          this.setState({
              post: res.data
          })
      })
      .catch((error) => {
          console.log(error);
      })
        var userposts =this.props.match.params.id;
     
      axios.get(process.env.REACT_APP_SECRET_CODE + "/api/getAllPostsOneUser/${userposts}")
     .then(req=>{
      if(req.statusCode === 401){ return window.location = "/login";}
        this.setState({userspost: req.data }) 
        }).catch((err)=>{
            console.log(err)
        })
    }
  render() {
     return (
      <div>
       <Link className='btn btn-main' to='/getAllUsers' >Users</Link>
         {this.state.userspost &&
          this.state.userspost.map(post => {
            return (
              <div className="user-posts" key={post._id}>
                  <h4>{post.title}</h4>
                  <h6> {post.post}</h6>
              </div>
          );
          })}
         
      </div>
    )
  }
}
