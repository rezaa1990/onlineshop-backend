const { truncate } = require('lodash');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Product = require('./products');

const userSchema = new mongoose.Schema({
  fName: { type: String,required:true},

  lName: { type: String,},

  mobile: { type: String,unique: true},

  email: { type: String, unique: true},

  address: { type: String,},

  postalCode: { type: String,},

  password: {type:String , required:true},

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
});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema );
module.exports = User;