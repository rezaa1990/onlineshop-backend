const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { Stream } = require('winston/lib/winston/transports');

const productSchema = new mongoose.Schema({
  category:{type:String,required:true},

  name: {type:String,required:true},

  images:
    [
      {type:mongoose.Schema.Types.ObjectId,
      ref:"َImage"},
    ],

  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
    }],

  numberOfLikes: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َUser"
    }],

  article:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َArticle"
    }],

  price: {type:String,required:true},

  rate:String,

  description:[{type:String},{required:true}],

  numberOfProduct:{type:String,required:true},

  numberOfSell:[{type:String}],

  discount:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َDiscount"
  }],

  serialNumber:{type:String,required:true},

});
productSchema.plugin(timestamp);

const Product = mongoose.model("Product", productSchema );
module.exports = Product;