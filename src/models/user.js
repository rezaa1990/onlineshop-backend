const { truncate } = require('lodash');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Product = require('./products');

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true},
  lName: { type: String, required: true},
  mobile: { type: Number, required: true,unique:true},
  email: { type: String, required: true, unique: true},
  address: { type: String, required: true},
  postalCode: { type: Number, required: true},
  isadmin: { type: Boolean, default: false},
  password: {type:String , required:true},
  basket:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }
});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema );
module.exports = User;