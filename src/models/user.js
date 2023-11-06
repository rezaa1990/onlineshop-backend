const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  mobile: { type: Number, required: true},
  email: { type: String, required: true, unique: true},
  address: { type: String, required: true},
  postalcode: { type: String, required: true},
  isadmin: { type: Boolean, default: false},
  basket: [],
  password: { type: String, required: true},
});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema );
module.exports = User;