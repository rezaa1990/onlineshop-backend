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
      images:req.body.imageId,
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
  try {
    const products = await this.Product.find()
    .populate({ path: 'images', model: 'Image' })
    .populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  })
  .populate({
    path: 'discount'
  })
  .populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  });

    console.log(products);
    this.response({ res, message: "همه ی محصولات", code: 200, data: { products } });
  } catch (error) {
    
    console.error(error);
    this.response({ res, message: "مشکل در دریافت محصولات", code: 500 });
  }
}

  

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateFields = {};

      if (req.body.category) {
        updateFields.category = req.body.category;
      }
      if (req.body.name) {
        updateFields.name = req.body.name;
      }
      if (req.body.images) {
        updateFields.image = req.body.images;
      }
      if (req.body.price) {
        updateFields.price = req.body.price;
      }
      if (req.body.description) {
        updateFields.description = req.body.description;
      }
      if (req.body.numberOfProduct) {
        updateFields.numberOfProduct = req.body.numberOfProduct;
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
    let product = await this.Product.findById(req.params.id);
    const index = product.numberOfLikes.indexOf(req.body.userId);

    if (index !== -1) {
      product.numberOfLikes.splice(index, 1);
    } else {
      product.numberOfLikes.push(req.body.userId);
    }

    const updatedProduct = await this.Product.findByIdAndUpdate(
      product._id,
      { $set: { numberOfLikes: product.numberOfLikes } },
      { new: true }
    )
    .populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  })
  .populate({
    path: 'discount'
  })
  // .populate({
  //   path: 'comments.reply',
  //   options: { sort: { createdAt: -1 } },
  //   populate: [
  //     { path: 'author', model: 'User' },
  //     { path: 'likes', model: 'User' },
  //     { path: 'reply', model: 'Comment', populate: [
  //       { path: 'author', model: 'User' },
  //       { path: 'likes', model: 'User' },
  //     ]}
  //   ]
  // });

    return this.response({ res, message: "محصول آپدیت شد", code: 200, data: { updatedProduct } });
  } catch (error) {
    console.error('Error in addLike:', error);
    return this.response({ res, message: "خطا", code: 500, data: {} });
  }
};

    

   async addComment(req, res) {
  try {
    let product = await this.Product.findById(req.params.id);
    if (!product) return this.response({ res, message: "محصولی یافت نشد", code: 404, data: {} });

    product.comments = [...product.comments, req.body.commentId];
    await product.save();

    product = await this.Product.findById(product._id)
      .populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  })
  .populate({
    path: 'discount'
  })
  .populate({
    path: 'comments.reply',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  });

    this.response({ res, message: "نظر شما ثبت شد", code: 200, data: { product } });
  } catch (error) {
    console.error(error);
    this.response({ res, message: "خطا در ثبت نظر", code: 500, data: {} });
  }
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