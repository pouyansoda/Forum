import React, { Component }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.withCredentials = true;

export default class UserMenu extends Component {

    render() {
        return(
            <div className="col-xs">            
                    <div className="link">
                       <Link to="/addNewArticle"  className="btn-post btn"> New post <i class="fas fa-pen"></i></Link>
                    </div>             
            </div>
        )
    }
};