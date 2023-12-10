const autoBind = require("auto-bind");
const {validationResult} = require('express-validator');
const User = require('./../models/user');
const Product = require('./../models/products');
const Comment = require('./../models/comments');
const Message = require('./../models/message');
const Order = require('./../models/order');
const Discount = require('./../models/discount');

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Product = Product;
    this.Comment = Comment;
    this.Message = Message;
    this.Order = Order;
    this.Discount = Discount;
  }

  validationBody(req,res){
    const result = validationResult(req);
    if(!result.isEmpty()){
      const errors = result.array();
      const messages = [];
      errors.forEach(err => messages.push(err.msg));
      res.status(400).json({
        message: 'خطای اعتبار سنجی',
        data: messages
      })
      return false;
    }
    return true;
  }

  validate(req,res,next){
    if(!this.validationBody(req,res)){
      return;
    }
    next();
  }

  response({res, message, code=200, data={}}){
    res.status(code).json({
      message,
      data
    });
  }

}; 