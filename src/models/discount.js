const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const discountSchema = new mongoose.Schema({
  type: { type: String, enum: ['percentage', 'amount']},
  value: { type: Number},
  expirationTime: { type: Number,},
  isActive: { type: Boolean, default: false },
});
discountSchema.plugin(timestamp);

const Discount = mongoose.model("Discount", discountSchema );
module.exports = Discount;