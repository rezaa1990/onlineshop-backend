const { truncate } = require('lodash');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Product = require('./products');

const userSchema = new mongoose.Schema({
  fName: { type: String,required:true},

  lName: { type: String,},

  mobile: { type: String,unique: true,select: false},

  email: { type: String, unique: true,select: false},

  address: { type: String,select: false},

  postalCode: { type: String,select: false},

  password: {type:String , required:true , select: false},

  basket:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
  ],

  numberOfEachProductInBasket:[{type:String,default:"1"}],

  avatar:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Image",
  }],

  role:{type:String},

  favorites: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
  }],

  resetCode: {type:String , select: false},

  resetCodeExpiration: Date,

});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema );
module.exports = User;