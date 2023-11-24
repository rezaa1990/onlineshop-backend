const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const productSchema = new mongoose.Schema({
  name: String,

  price: String,

  numberOfLikes: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َUser"
  }],

  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }],

  description: String,

  img:Buffer,

});

productSchema.plugin(timestamp);

const Product = mongoose.model("Product", productSchema );
module.exports = Product;