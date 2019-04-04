import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style.css"
axios.defaults.withCredentials = true;

export default class MainUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:null,
            value:  this.props.post,
            values: "",
            updateMode: false,
            post : "",
            usernameId:this.props.post.user._id
        }     
        axios.get('http://localhost:5000/api/session' ) 
        .then(res => {
          if(res.statusCode === 401) return window.location = "/login";
          this.setState({user: res.data.session})
        })
    } 
   
   deleteHandler = () => {
       var deletePost =  this.props.post._id;
    axios
      .delete(`http://localhost:5000/api/deletePostById/${deletePost}`)
      .then(res => {
        this.props.pageRefresh();
      });
    }
    voteHandler = () => {
       var vote =   this.props.post._id;
        axios.post(`http://localhost:5000/api/postUpVote/${vote}` )
        .then(res => {
            this.props.pageRefresh();
          });
    }
    openToUpdate = () => {
        this.setState({ updateMode: true });
      }
    closeToUpdate = () => {
        this.setState({ updateMode: false });
      }
    handleChange = (e) => {
        this.setState({ values: e.target.value });
      }
    handleSubmit = (e) => {
        e.preventDefault();
        var updatePost = this.props.post._id;
        axios
          .put(`http://localhost:5000/api/updatePost/${updatePost}`,
            {
              post: this.state.values
            }
          )
          .then(res => {
            this.props.pageRefresh();
            return this.setState({ updateMode: false });
          });
      }
  render() {
    var post = this.props.post;
    var val = this.state.values;
    var link = `/Article/${this.props.post._id}`;
    // console.log(userId) 
    // console.log('user : ',post.user._id)
    return (
      <div>
          <ul className="box-field">
             <li > 
               {/* here we try to update the post  */}
               {this.state.updateMode ? (
                        <div>
                            <form className="p-4" onSubmit={this.handleSubmit}>
                                <textarea
                                onChange={this.handleChange}
                                value={val || post.post}
                                name="edit"
                                className="form-control"
                                rows={3}
                                />
                                <button className="btn btn-info  btn-sm" type="Submit">
                                update
                                </button>
                                <button onClick={this.closeToUpdate} className="btn btn-warning  btn-sm" type="Submit">
                                Cancel
                                </button>
                            </form>
                                
                        </div>
                    ) : (
                        <div>
                            <div >          
                                <Link to={link} className="title">{post.title}</Link>                                     
                                <div className="postField">
                                
                                  <p>{post.post}</p>
                                </div>
                                  <button   onClick={this.voteHandler} name="vote" value={this.state.vote} className="btn btn-info vote"><i class="far fa-thumbs-up"></i>&nbsp;&nbsp;{post.vote}</button>
                                <br/>
                            </div>
                      {this.state.user &&
                        this.state.user._id ===  this.props.post.user._id && (
                        <div>
                            <button className="btn btn-danger btn-sm"  onClick={() => {
                                if (
                                window.confirm(
                                    "Are you sure you wish to delete this post?"
                                )
                                )
                                this.deleteHandler();
                            }}>Delete</button>
                            <button className="btn btn-warning btn-sm" onClick={this.openToUpdate}>Edit</button> 
                        </div>
                        )}                    
                      <hr />
                     <b> Written by 	&#8594; <Link to={`/getAllPostsOneUser/${post.user._id}`} >{post.user.name}</Link> <p class="dateShow">at &#8594; {post.createdAt.slice(0, 10)}</p></b>
                    
                        </div>
                    ) 
               }                         
             </li>
          </ul>
       </div>
    )
  }
}
