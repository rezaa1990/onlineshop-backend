const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post(
  '/addproduct',
  validator.productsValidator(),
  controller.addProduct,
);

router.get(
  '/getproducts',
//   validator.loginValidator(),
//   controller.validate,
  controller.getProduct
);

module.exports = router;