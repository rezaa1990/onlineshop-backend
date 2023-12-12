const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addImage(req, res) {
    const image = new this.Image({

    });
    await image.save();
    this.response({
      res,
      message: "تصویر ذخیره شد",
      data: _.pick(message, ["", "",, ""]),
    });
  }

})();