const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');
const multer = require('multer');

module.exports = new (class extends controller {
  async addImage(req, res) {
    try {
      console.log(req.file);
      const savedImages = [];
      for (const image of req.files) {
      const savedImage = await this.Image.create({
      imageName: image.originalname,
      imagePath: image.path,
       });
  savedImages.push(savedImage);
}

this.response({
  res,
  message: "تصاویر با موفقیت آپلود شدند",
  data: { images: savedImages },
});
    } catch (error) {
      console.error(error);
      this.response({
        res,
        status: 500,
        message: "خطا در آپلود تصویر",
      });
    }
  }
})();



