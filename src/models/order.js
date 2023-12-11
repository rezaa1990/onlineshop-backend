const { truncate } = require('lodash');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const orderSchema = new mongoose.Schema({
  productsId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
  numberOfEachProductInBasket:[{type:String, default:"1"}],
  FName: { type: String,},
  LName: { type: String,},
  mobile: { type: String,},
  email: { type: String,},
  address: { type: String,},
  postalCode: { type: String,},
  isFactorMade:{type:Boolean,default:false},
  postalInformation:{type:Boolean,default:false},
  payment:{type:Boolean,default:false},
  sendToPost:{type:Boolean,default:false},
});
orderSchema.plugin(timestamp);

const Order = mongoose.model("Order", orderSchema );
module.exports = Order;