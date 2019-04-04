import React, { Component } from 'react'
import axios from "axios";
import "./Head.css"
export default class Header extends Component {
    logoutHandler = () => {
        axios
          .get("http://localhost:5000/api/logOut")
          .then(res => {
            if(res) {
             window.location.href = '/login';
          }
          window.location.href = '/';
          });
      }
  render() {
    return (
      <div>
            <div className="header ">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item ">
                        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link log" href="/Login">Sign In</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link log" href="/register">Registration</a>
                    </li>
                 </ul>
                   
                </div>
                <p className="nav-link nav-item logout" onClick={this.logoutHandler} >Log Out</p>
                </nav>
            </div>
      </div>
    )
  }
}
