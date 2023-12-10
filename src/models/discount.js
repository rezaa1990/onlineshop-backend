const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const discountSchema = new mongoose.Schema({
  type: { type: String, enum: ['percentage', 'amount'], required: true },
  value: { type: Number, required: true },
  expirationTime: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
});
discountSchema.plugin(timestamp);

const Discount = mongoose.model("Discount", discountSchema );
module.exports = Discount;