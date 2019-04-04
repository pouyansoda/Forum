const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');
const Article = require('../Models/MessageModel');
const User = require('../Models/UserModel');
const session = require('express-session');


////////////////////
///Create a new post
////////////////////
const CreateArticle = ((req, res) => {
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.mapped() });
	}
  let msg = new Article(req.body);
	console.log('TCL: req.session.user', req.session.user);
  msg.user = req.session.user._id;
	msg.save().then(savedMsg => {
		res.send(savedMsg);
	});
});
//////////////////////////////////////////////////
///Get all post from database by desc created date
//////////////////////////////////////////////////
const getAllArticles = (req , res) => {
    Article.find()
        .populate("user", ["name", "email"])
        .sort({ createdAt: "desc" })
		.then(post => {
            res.json(post);
          })
          .catch(error => {
            res.json(error);
          });
}
//////////////////////////
///Get one post by post Id
//////////////////////////
const getArticleById = (req, res) => {
    Article.findById({ _id: req.params.id })
		.populate('user')
        .then(messages => res.send(messages));
}
////////////////////////////
///Get All posts of one user
////////////////////////////
const getAllPostsOneUser = (req, res) => {
  // console.log(req)
  Article.find({'user' : req.params.id  })
  .populate('user')
  
      .then(messages => res.send(messages));
}
////////////////////////////
///leave a comment on a post
//////////////////////////
const comment = (req, res) => {
  console.log(req.body)  
  Article.findById({ _id: req.body._id }).then(message => {

	// console.log('TCL: req.session.user', req.session.user);
  message.user = req.session.user._id;
		let comments = message.comments;
		comments.push({ ...req.body, id: Date.now() });
		message.comments = comments;
		message.save().then(savedMsg => {
			res.send(savedMsg);
		});
	});
}
/////////////////
///Vote to the post
///////////////////
const postUpVote = (req, res) => {
  Article.findById(req.params.id).then(function(post) {
    post.vote = post.vote + 1;
    console.log(post.vote)
    post.save().then(function(post) {
      res.send(post);
    });
  });
}
////////////////////
///Delete Post by ID
////////////////////
const deletePostById = (req, res) => {
    Article.findById({ _id: req.params.id})
      .then(article => {
        // if (article.user === req.session.user._id) {
          Article.findOneAndRemove({ _id: req.params.id })
            .then(res => {
              res.send(res);
            })
            .catch(err => {
              res.send(err);
            });
        // }
      })
      .catch(err => res.send(err));
}
///////////////////
///update your post
///////////////////
const updatePost = (req, res) => {
  var errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.mapped() });
    }
    Article.findOne({ _id: req.params.id }).then(message => {
      message.post = req.body.post;
      message.save().then(savedMsg => {
        res.send(savedMsg);
      });
    });
}
////////////////////////////////
///Logged in users can only post
////////////////////////////////
const auth = (req, res, next) => {
	// console.log('TCL: auth -> req.session.user', req.session.user);
	if (req.session.user) {
		return next();
	} else {
		return res.status(401).send();
	}
}

module.exports = {
    CreateArticle,
    auth,
    getAllArticles,
    getArticleById,
    deletePostById,
    updatePost,
    postUpVote,
    getAllPostsOneUser,
    comment
};