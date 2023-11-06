const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addProduct(req, res) {
    const product = new this.Product({
      name:req.body.name,
      price:req.body.price,
      numberOfLikes:req.body.numberOfLikes,
      description:req.body.description,
    });
    await product.save();
    this.response({
      res,
      message: "محصول با موفقیت ثبت شد",
      data: _.pick(product, ["name", "price", "numberOfLikes","description"]),
    });
  }
    async getProduct(req, res) {
      const products = await this.Product.find()
      console.log(products)
      this.response({ res, message: "successfull", code:200, data: { products } });
    }
})();