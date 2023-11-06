const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  numberOfLikes: Number,
  description: String
});
productSchema.plugin(timestamp);

const Product = mongoose.model("Product", productSchema );
module.exports = Product;