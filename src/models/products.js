const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { Stream } = require('winston/lib/winston/transports');
const autoPopulate = require('mongoose-autopopulate');

const productSchema = new mongoose.Schema({
  category:{type:String},

  name: {type:String},

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

  price: {type:String},

  rate:String,

  description:{type:String},

  numberOfProduct:{type:String,required:true},

  numberOfSell:[{type:String}],

  discount:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Discount"
  }],

  serialNumber:{type:String,required:true},

});
productSchema.plugin(timestamp);
productSchema.plugin(autoPopulate);

const Product = mongoose.model("Product", productSchema );
module.exports = Product;