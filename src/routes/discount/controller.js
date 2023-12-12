const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async makeDiscount(req, res) {
    const discount = new this.Discount({
      type :req.body.type,
      value:req.body.value,
      expirationTime:req.body.expirationTime,
    });
    discount.isActive = true;
    await discount.save();
    this.response({
      res,
      message: "تخفیف جدید با موفقیت ساخته شد",
      data:discount,
    });
  }
})();