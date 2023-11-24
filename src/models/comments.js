const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const commentSchema = new mongoose.Schema({
  author: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"َUser"
    }],
  text: String,
});
commentSchema.plugin(timestamp);

const Comment = mongoose.model("Comment", commentSchema );
module.exports = Comment;