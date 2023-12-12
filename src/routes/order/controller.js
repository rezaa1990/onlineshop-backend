const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addOrder(req, res) {
    try {
      const productsId = req.body.productsId;
      const numberOfEachProductInBasket = req.body.numberOfEachProductInBasket;
  
      const order = new this.Order({
        productsId,
        numberOfEachProductInBasket,
        isFactorMade: true,
        postalInformation: false,
        payment: false,
        sendToPost: false,
      });
      await order.save();
  
      let totalPrice = 0;
      const factors = [];
      for (let i = 0; i < productsId.length; i++) {
        const product = await this.Product.findById(productsId[i]);
        const discount =  await this.Discount.findById(product.discount);
        console.log('product',product)
        console.log('discount',discount)
        
        
        const productName = product.name;
        const numberOfEachProduct = parseInt(numberOfEachProductInBasket[i]);
        let pricePerUnit = parseInt(product.price);
        if (discount && discount.isActive === true) {
          if (discount.type === "percentage") {
            pricePerUnit *= (1 - discount.value);
          } else {
            pricePerUnit -= discount.value;
          }
        }
  
        const priceMNumber = pricePerUnit * numberOfEachProduct;
        totalPrice += priceMNumber;
  
        const factor = {
          productName,
          numberOfEachProduct,
          pricePerUnit,
          priceMNumber,
          discount:discount.value,
          
        };
  
        factors.push(factor);
      }
  
      this.response({
        res,
        message: "فاکتورها ساخته شدند و آماده دریافت اطلاعات تماس مشتری می‌باشند",
        data: {
          factors,
          totalPrice,
          order,
        },
      });
  
    } catch (error) {
      this.response({
        res,
        message: "خطا در ساخت فاکتور",
        data: {},
      });
    }
  }
  
  

  async addPostalInformation(req, res) {
    try {
      console.log(req.params.id)
      console.log("addpostalcode",req.body)
      const order = await this.Order.findById(req.params.id);
      order.FName = req.body.FName;
      order.LName = req.body.LName;
      order.mobile = req.body.mobile;
      order.email = req.body.email;
      order.address = req.body.address;
      order.postalCode = req.body.postalCode;
      isFactorMade: true,
      order.postalInformation = true;
      order.payment = false;
      order.sendToPost = false;
      await order.save();
      this.response({
        res,
        message: "‌اطلاعات پستی دریافت شد و سفارش آماده ی پرداخت نهایی میباشد",
        data: {
          order
        },
      });
  
    } catch (error) {
      this.response({
        res,
        message: "خطا در ساخت فاکتور",
        data: {},
      });
    }
  }
  
  
})();