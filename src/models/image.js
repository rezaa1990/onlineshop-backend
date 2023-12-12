const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

imageSchema.plugin(timestamp);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
