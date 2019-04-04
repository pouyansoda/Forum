const {
    check,
    validationResult
} = require('express-validator/check');
const User = require('./../Models/UserModel');

//Registration validation
const reqValidation = [

check('name')
    .not()
    .isEmpty()
    .withMessage('Please enter your name!')
    .matches(/^[A-z ]+$/)
    .withMessage('Your name should not contain any numbers')
    .custom(value => {
        return User.findOne({
                name: value
            })
            .then(name => {
                if (name) {
                    throw new Error('This name is already in use');
                }
            });
    }),
check('email')
    .not()
    .isEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Please enter the valid email')
    .custom(value => {
        return User.findOne({
                email: value
            })
            .then(email => {
                if (email) {
                    throw new Error('This email is already in use');
                }
            });
    }),
check('password')
    .not()
    .isEmpty()
    .withMessage('Please enter your password')
    .isLength({
        min: 5
    })
    .withMessage('Password should contain at least 5 characters'),
]
const logValidation = [
check('email')
    .not()
    .isEmpty()
    .withMessage('email is required!')
    .isEmail()
    .withMessage('Please enter the valid email'),
check('password')
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .isLength({
        min: 5
    })
    .withMessage('Password should be at least 5 letters'),

];
const ArticleValidation = [
check('title')
    .not()
    .isEmpty()
    .withMessage('title is required!')
    // .matches(/^[A-z ]+$/)
    // .withMessage('Your title should not contain any numbers')
    ,
check('post')
    .not()
    .isEmpty()
    .withMessage('post can not be empty!')
    .isLength({
        min: 12
    })
    .withMessage('post should be at least 12 letters'),
];

module.exports = {
    reqValidation,
    logValidation,
    ArticleValidation
}