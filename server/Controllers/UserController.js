var mongoose = require('mongoose');
const User = require('../Models/UserModel');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const session = require('express-session');
/////////////////
/// Make new USer
/////////////////
const Registration = ((req, res, next) => {
    var err = validationResult(req);
    var errorConfirmPass = '';
    if(req.body.password !== req.body.confirmPass) {
         errorConfirmPass = 'Password does not match';
    };
    if(!err.isEmpty() || errorConfirmPass !== '') {
        // console.log(err.mapped())
        return res.send({'errors': err.mapped(), 'errorConfirmPass': errorConfirmPass});
     };
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    let user = new User(req.body);
     user.save()
         .then(user => {
             res.status(200).json({'user': 'user added'});        
         });
});
//////////////////////////////
///Get all Users from database
//////////////////////////////
const getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log('Error getting users: ', err)
            return next();
        }
        res.json(users);
    })
}
/////////////
///Login User
/////////////
const Login = (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).send({ errors: errors.mapped() });
    }
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            console.log('Error getting User: ', err);
            return next();
        }
        if(!user) {
            return res.status(404).json({err : true, message : "User dose not exist"})
        };
        if(!user.comparePassword(req.body.password, user.password)) {
            return res.status(404).json({err: true, message:"Password is not correct, Please try again"});
        }
        req.session.user = user;
        res.json(user)
    })
}
////////////////////////////////////
/////Get only one user from database
////////////////////////////////////
const findOneUser = (req, res, next) => {
    User.findOne({
        name: req.params.name
    }, (err, user) => {
        if (err) {
            console.log('Error getting the user: ', user)
            // return next();
        }
        res.json(user);
    })
}
//////////////////
///update the user
//////////////////
const updateUser = (req, res) => {
    var errors = validationResult(req);
  
      if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.mapped() });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 12);
      User.findOne({ _id: req.params.id }).then(user => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save().then(savedData => {
          res.send(savedData);
        });
      });
  }
///////////////
///Current User
///////////////
const currentUser = (req, res, next) => {
        if (req.session.user) {
          return res.json(req.session.user);
        }
        return res.status(422).json({ msg: "The authentication failed" });
}
/////////////////////
///authenticated User
/////////////////////
const authenticateUser = (req ,res ,next) => {
    if (req.session.user) return next();
    res.status(401).json({
        err: true,
        message: 'Not authenticated'
    });
}
////////////////////////////
///to get authenticated User
///////////////////////////
const getAuthenticateUserName = (req, res, next) => {
    res.json({name: req.session.user.name})
     next()
}
//////////////
///Logout User
//////////////
const logOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error logging out: ', err);
            // return next();
        }
        res.json({
            ok: "you logged out"
        })
    })
}

module.exports = {
    Registration,
    getAllUsers,
    Login,
    logOut,
    currentUser,
    findOneUser,
    updateUser,
    authenticateUser,
    getAuthenticateUserName
};

