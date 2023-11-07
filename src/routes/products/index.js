const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/addproduct',
  isLoggined,
  isAdmin,
  validator.productsValidator(),
  controller.validate,
  controller.addProduct,
);

router.get(
  '/getproducts',
  controller.getProduct
);

router.put(
  '/updateproduct/:id',
  isLoggined,
  isAdmin,
  validator.productsValidator(),
  controller.validate,
  controller.updateProduct
);

router.delete(
  '/deleteproduct/:id',
  isLoggined,
  isAdmin,
  controller.deleteProduct
);

module.exports = router;