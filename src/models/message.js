const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const messageSchema = new mongoose.Schema({
  sender:String,
  email:String,
  content: String,
});
messageSchema.plugin(timestamp);

const Message = mongoose.model("Message", messageSchema );
module.exports = Message;