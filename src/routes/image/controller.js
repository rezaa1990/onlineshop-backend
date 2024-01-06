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
      const image = new this.Image({
        imageName: req.file.originalname,
        imagePath: req.file.path
      });
      await image.save();
      this.response({
        res,
        message: "تصویر با موفقیت آپلود شد",
        data: { image },
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



