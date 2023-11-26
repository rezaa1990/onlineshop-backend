const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addMessage(req, res) {
    const message = new this.Message({
      sender:req.body.senderName,
      email:req.body.senderEmail,
      content:req.body.content,
    });
    await message.save();
    this.response({
      res,
      message: "پیام با موفقیت ارسال شد",
      data: _.pick(message, ["sender", "email",, "content"]),
    });
  }
  async getMessages(req, res) {
    const message = await this.Message.find();
    console.log(message);
    this.response({ res, message: "همه ی پیامها", code: 200, data: { message } });
  }
  

    // async updateProduct(req,res){
    //   console.log(req.params.id);
    //   console.log(req.body);
    //   const result = await this.Product.findByIdAndUpdate(req.params.id, {
    //     name: req.body.updateName,
    //     price: req.body.updatePrice,
    //     numberOfLike: req.body.updateNumberOfLikes,
    //     description:req.body.updateDescription,
    //     img:req.body.updateImg

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

    // async addComment(req,res){
    //   const product = await this.Product.findById(req.body.productId);
    //   if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}});
    //   product.comments = [...product.comments,req.body.commentId];
    //   await product.save();
    //   this.response({ res, message: "نظر شما ثبت شد", code:200, data: {product} });

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