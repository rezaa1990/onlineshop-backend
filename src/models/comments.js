const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const autoPopulate = require('mongoose-autopopulate');

const commentSchema = new mongoose.Schema({
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"َUser"
  },
  text: String,

  date: { type: Date, default: Date.now },

  isApproved:{type:Boolean,default:false},

  reply: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َComment"}],

  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َUser"
    }],
});
commentSchema.plugin(timestamp);
commentSchema.plugin(autoPopulate);

const Comment = mongoose.model("Comment", commentSchema );
module.exports = Comment;