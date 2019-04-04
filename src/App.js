import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import axios from "axios";
import Footer from "./Components/Head-Foot/footer"
import Header from "./Components/Head-Foot/Header"
// import axios from 'axios';
import Registration from './Components/Req-Log/Registration';
import Login from './Components/Req-Log/Login';
import Main from './Components/MainPages/Main';
import Home from './Components/Req-Log/Home';
import addNewArticle from './Components/Article/CreateArticle';
// import userId from './Components/Users/userInfo';
import UserPost from './Components/Users/UserPosts';
import Users from './Components/Users/AllUsers';
import articleId from './Components/Article/OneArticle';
// import SocketIo from './SocketIo/chat'

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
     <div>
      <Header/> 
       <br />
              <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/home' component={Main} />
                  <Route exact path='/register' component={Registration} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/getAllPostsOneUser/:id' component={UserPost} />
                  <Route exact path='/getAllUsers' component={Users} />
                  <Route exact path='/addNewArticle' component={addNewArticle} />
                  <Route exact path='/article/:id' component={articleId} />
                </Switch>
              </BrowserRouter>
        <br />
      <Footer/>      
    </div>
    );
  }
}
export default App;