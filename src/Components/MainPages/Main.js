import React, { Component } from 'react'
import axios from 'axios';
// import ShowHome from "./ShowHome";
import {Redirect , Link } from 'react-router-dom';
import UserMenu from "./UserMenu";
import MainUpdate from "./MainUpdate";
// import UserPost from "./../Users/UserPosts";
import './style.css';
axios.defaults.withCredentials = true;


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        post: [],
        sessionUser:true,
        username:"",
        vote:""

    }
};
componentDidMount = () => {
  axios.get(process.env.REACT_APP_SECRET_CODE + "/api/session" ) 
  .then(res => {
    if(res.statusCode === 401) return window.location = "/login";
    this.setState({sessionUser: res.data.session})
  })
  axios.get(process.env.REACT_APP_SECRET_CODE + "/api/user")
 .then(req=>{
  if(req.statusCode === 401){ return window.location = "/login";}
    this.setState({username: req.data.name }) 
    
    }).catch((err)=>{
        console.log(err)
    })
    this.getPostings();
}
getPostings = () => {
  axios.get(process.env.REACT_APP_SECRET_CODE + "/api/getAllArticles")
  .then(res => {
      this.setState({
          vote : res.data.vote,
          post: res.data
      })
  })
  .catch((error) => {
      console.log(error);
  })
}
pageRefresh = () => {
  this.getPostings();
}
  render() {
    // const post = this.state.post;
  
    return (
      (this.state.sessionUser) ? 
      <div>
         <h4 className="welcome">Welcome : </h4> <h5  className="welcome"> {this.state.username}</h5>
         <br/>
         <Link to="/getAllUsers"><button className="btn btn-user"><i class="fas fa-users"></i></button></Link>
         <br />
         <div className="row">
        
                    <div className="col-md">
                    <UserMenu />
                    </div>
                   
                   
                    
                </div>
         {this.state.post &&
          this.state.post.map(post => {
            return (
              <div className="article" >
                   <MainUpdate pageRefresh={this.pageRefresh} key={post._id}  post={post}/>
                   {/* <UserPost pageRefresh={this.pageRefresh} key={post._id}  post={post}/> */}
              </div>
          );
          })}
      </div>
      :
      <Redirect to='/' />
    )
  }
}
