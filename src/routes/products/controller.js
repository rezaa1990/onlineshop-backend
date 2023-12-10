const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addProduct(req, res) {
    let checkSerialNumber = await this.Product.findOne({ serialNumber: req.body.serialNumber });
    if (checkSerialNumber) {
      return this.response({
        res,
        code: 400,
        message: "این شماره سریال قبلا ثبت شده است",
      });
    }
    const product = new this.Product({
      category:req.body.category,
      name:req.body.name,
      // images:req.body.imgage,
      price:req.body.price,
      description:req.body.description,
      numberOfProduct:req.body.numberOfProduct,
      serialNumber:req.body.serialNumber,
      
    });
    await product.save();
    this.response({
      res,
      message: "محصول با موفقیت ثبت شد",
      data: _.pick(product, ["category","name","price","description","numberOfProduct","serialNumber"]),
    });

  }
  async getProduct(req, res) {
    const products = await this.Product.find()
      .populate({
        path: 'comments',
        options: { sort: { createdAt: 1 } },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      });
    console.log(products);
    this.response({ res, message: "همه ی محصولات", code: 200, data: { products } });
  }
  

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateFields = {};

      if (req.body.updateCategory) {
        updateFields.category = req.body.updateCategory;
      }
      if (req.body.updateName) {
        updateFields.name = req.body.updateName;
      }
      if (req.body.updateImages) {
        updateFields.image = req.body.updateImages;
      }
      if (req.body.updatePrice) {
        updateFields.price = req.body.updatePrice;
      }
      if (req.body.updateDescription) {
        updateFields.description = req.body.updateDescription;
      }
      if (req.body.updateNumberOfProduct) {
        updateFields.numberOfProduct = req.body.updateNumberOfProduct;
      }

  
      const result = await this.Product.findByIdAndUpdate(productId, updateFields, { new: true });
  
      if (!result) {
        return this.response({ res, message: "محصول مورد نظر یافت نشد", code: 404 });
      }
  
      return this.response({ res, message: "مشخصات محصول بروزرسانی شد", code: 200, data: { result } });
    } catch (error) {
      return this.response({ res, message: "خطا در بروزرسانی محصول", code: 500 });
    }
  };
  

    async addLike(req, res) {
      try {
        const product = await this.Product.findById(req.params.id);
        const index = product.numberOfLikes.indexOf(req.body.userId);
        // اگر عنصر یافت شد
        if (index !== -1) {
          // حذف عنصر از آرایه
          product.numberOfLikes.splice(index, 1);
          await product.save();
          return this.response({ res, message: "محصول آنلایک شد", code: 200, data: { product } });
        }
        // اضافه کردن
        const numberOfLike = [...product.numberOfLikes, req.body.userId];
        product.numberOfLikes = numberOfLike;
        await product.save();
        return this.response({ res, message: "محصول لایک شد", code: 200, data: { product } });
      } catch (error) {
        console.error('Error in addLike:', error);
        return this.response({ res, message: "خطا", code: 500, data: {} });
      }
    };
    

    async addComment(req,res){
      const product = await this.Product.findById(req.params.id);
      if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}});
      product.comments = [...product.comments,req.body.commentId];
      await product.save();
      this.response({ res, message: "نظر شما ثبت شد", code:200, data: {product} });

    };

    async deleteComment(req, res) {
      console.log("reqqqqqqqq", req);
      try {
          // Assuming 'Product' is your mongoose model for products
          const product = await Product.findById(req.params.productId);
  
          if (!product) {
              return this.response({
                  res,
                  message: "محصولی یافت نشد",
                  code: 404,
                  data: {}
              });
          }
  
          // Filter out the comment to be deleted from the product's comments array
          product.comments = product.comments.filter(comment => comment._id.toString() !== req.params.commentId);
          
          // Save the updated product
          await product.save();
          
          this.response({
              res,
              message: "کامنت حذف شد",
              code: 200
          });
      } catch (error) {
          this.response({
              res,
              message: "خطا در حذف کامنت",
              code: 500
          });
      }
      console.log("deleeeeeeeeeeeey");
  }


  async addDiscount(req, res) {
    try {
      const selectedProducts = Array.isArray(req.body.selectedProducts)
        ? req.body.selectedProducts
        : [req.body.selectedProducts];
  
      const discountId = req.body.discountId;
  
      const updateResult = await this.Product.updateMany(
        { _id: { $in: selectedProducts } },
        { $set: { discount: discountId } }
      );
  
      if (updateResult.nModified !== selectedProducts.length) {
        return this.response({
          res,
          message: "یک یا چند محصول با مشخصات داده شده تغییر یافتند",
          data: {}
        });
      }
  
      this.response({
        res,
        message: "تخفیف با موفقیت برای محصولات انتخابی اعمال شد",
        data: {}
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در اعمال تخفیف",
        data: {}
      });
    }
  }
  
  
  async removeDiscount(req, res) {
    try {
      const selectedProducts = Array.isArray(req.body.selectedProducts)
        ? req.body.selectedProducts
        : [req.body.selectedProducts];
  
      const updateResult = await this.Product.updateMany(
        { _id: { $in: selectedProducts } },
        { $set: { discount: null } }
      );
  
      if (updateResult.nModified !== selectedProducts.length) {
        return this.response({
          res,
          message: "یک یا چند محصول با مشخصات داده شده تغییر یافتند",
          data: {}
        });
      }
  
      this.response({
        res,
        message: " تخفیف با موفقیت از محصولات انتخاب شده خذف شد",
        data: {}
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در حذف تخفیف",
        data: {}
      });
    }
  }
  
  


    async deleteProduct(req,res){
      console.log(req.params.id);
      console.log(req.body);
      const product = await this.Product.findById(req.params.id);
      if(!product) return this.response({res, message: "محصولی یافت نشد  ", code:404, data: {}})
      const result = await this.Product.findByIdAndRemove(req.params.id);
      this.response({ res, message: "محصول حذف گردید", code:200, data: { result } });
    };

})();