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
      this.response({ res, message: "همه ی محصولات", code:200, data: { products } });
    }

    async updateProduct(req,res){
      console.log(req.params.id);
      console.log(req.body);
      const result = await this.Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        numberOfLike: req.body.numberOfLike,
        description:req.body.description
      })
      this.response({ res, message: "مشخصات محصول بروزرسانی شد", code:200, data: { result } });
    };

    async deleteProduct(req,res){
      console.log(req.params.id);
      console.log(req.body);
      const product = await this.Product.findById(req.params.id);
      if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}})
      const result = await this.Product.findByIdAndRemove(req.params.id);
      this.response({ res, message: "محصول حذف گردید", code:200, data: { result } });
    };

})();