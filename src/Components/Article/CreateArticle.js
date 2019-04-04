import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './article-style.css'
axios.defaults.withCredentials = true;

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state={
            formData:{
                title:'',
                post:'',
                comments:[],
             },
            isLoggedIn:true,
            errors:null
        }

        axios.get(process.env.REACT_APP_SECRET_CODE + '/api/session')
        .then((res)=>{this.setState({isLoggedIn:res.data.session})})
    }
    
    changeHandler = (event) => {
        var formData=this.state.formData;
        formData[event.target.name]= event.target.value;
        this.setState({formData:formData})
    }
    submitHandler = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SECRET_CODE + '/api/newPost',this.state.formData)
        .then(res=>{
            // console.log(this.state.formData)
            if (res.data.msg) {
                return this.setState({ errors: res.data.msg });
              }
            if (res.status === 200) {
                window.location.href = "/main";
              }
            //   console.log(this.state.errors);
        })
    }
    render() {
        return (
            !this.state.isLoggedIn ? <Redirect to='/' /> :
            <div>
            
            <form className="new-post" onSubmit={this.submitHandler} >
                    <div className="form-group">
                    <label>Title </label><br />
                        <input type="text" onChange={this.changeHandler} className="form-control" id="title" name='title' placeholder="Enter title"/>
                        {this.state.errors && this.state.errors.title && <p className='text-danger' >{this.state.errors.title.msg}</p> }
                    </div>
                    <div className="form-group">
                    <label>Post </label><br />
                        <textarea rows="8" cols="80" type="text" onChange={this.changeHandler} className="form-control post-area"  name='post' id="post" placeholder="post"/>
                        {this.state.errors && this.state.errors.post && <p className='text-danger' >{this.state.errors.post.msg}</p> }                   
                    </div>                  
                    <button type="submit" className="btn btns">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddArticle;