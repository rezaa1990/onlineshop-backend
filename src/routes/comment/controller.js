const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addComment(req, res) {
    const comment = new this.Comment({
      author:req.body.author,
      text:req.body.text,
    });
    console.log('comment',comment)
    await comment.save();
    this.response({
      res,
      message: ";نظر شما با موفقیت ساخته شد",
      data:comment,
    });
  }
    // async getProduct(req, res) {
    //   const products = await this.Product.find()
    //   console.log(products)
    //   this.response({ res, message: "همه ی محصولات", code:200, data: { products } });
    // }

    // async updateProduct(req,res){
    //   console.log(req.params.id);
    //   console.log(req.body);
    //   const result = await this.Product.findByIdAndUpdate(req.params.id, {
    //     name: req.body.name,
    //     price: req.body.price,
    //     numberOfLike: req.body.numberOfLike,
    //     description:req.body.description,
    //     imgPath:req.body.imgPath,

    //   })
    //   this.response({ res, message: "مشخصات محصول بروزرسانی شد", code:200, data: { result } });
    // };

    // async addLike(req,res){
    //   // console.log(req.params.id);
    //   // console.log(req.body);
    //   const product = await this.Product.findById(req.params.id);
    //   if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}});
    //   if(product.numberOfLikes.includes(req.body.userId)) return (this.response({res, message:'این محصول قبلا توسط شما لایک شده است', code:400, data: {}}))
    //   console.log('product.numberOfLikes',product.numberOfLikes);
    //   const numberOfLike = [...product.numberOfLikes,req.body.userId];
    //   product.numberOfLikes=numberOfLike;
    //   await product.save();
    //   this.response({ res, message: "محصول لایک شد", code:200, data: {product} });

    // };

    // async deleteProduct(req,res){
    //   console.log(req.params.id);
    //   console.log(req.body);
    //   const product = await this.Product.findById(req.params.id);
    //   if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}})
    //   const result = await this.Product.findByIdAndRemove(req.params.id);
    //   this.response({ res, message: "محصول حذف گردید", code:200, data: { result } });
    // };

})();