import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './article-style.css'
axios.defaults.withCredentials = true;

export default class OneArticle extends Component {
    constructor(props){
        super(props)
        this.state = {
          sessionUser:true,
          userspost:[],
          post:[]
        }
    }
    componentDidMount = () => {
      axios.get('http://localhost:5000/api/session' ) 
      .then(res => {
        if(res.statusCode === 401) return window.location = "/login";
        this.setState({sessionUser: res.data.session})
      })
      axios.get(`http://localhost:5000/api/getAllArticles`)
      .then(res => {
            this.setState({
              post: res.data
          })
      })
      .catch((error) => {
          console.log(error);
      })
        var userposts =this.props.match.params.id;
        axios.get(`http://localhost:5000/api/getAllArticles/${userposts}`)
        .then(req=>{
         if(req.statusCode === 401){ return window.location = "/login";}
           this.setState({userspost: req.data }) 
           
           }).catch((err)=>{
               console.log(err)
           })
    }
  render() {
    var posts = this.state.userspost;
    return (
      <div>
      <div className="user-post">
                  <h4>{posts.title}</h4>
                  <br/>
                  <h6> {posts.post}</h6>
       </div>
      </div>
    )
  }
}
