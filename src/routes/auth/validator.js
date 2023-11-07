const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  registerValidator(){
    return [
      check('fname')
      .not()
      .isEmpty()
      .withMessage('name cant be empty'),
      check('lname')
      .not()
      .isEmpty()
      .withMessage('last name cant be empty'),
      check('mobile')
      .not()
      .isEmpty()
      .withMessage('mobile number cant be empty'),
      check('email')
      .isEmail()
      .withMessage('email is invalid'),
      check('address')
      .not()
      .isEmpty()
      .withMessage('address cant be empty'),
      check('postalcode')
      .not()
      .isEmpty()
      .withMessage('postalcode cant be empty'),
      check('password')
      .not()
      .isEmpty()
      .withMessage('password cant be empty'),
    ]
  }

  loginValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('email is invalid'),
      check('password')
        .not()
        .isEmpty()
        .withMessage('password cant be empty'),
    ]
  }
}