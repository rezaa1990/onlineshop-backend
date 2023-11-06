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

router.put(
  '/updateproduct/:id',
//   validator.loginValidator(),
//   controller.validate,
  controller.updateProduct
);

router.delete(
  '/deleteproduct/:id',
//   validator.loginValidator(),
//   controller.validate,
  controller.deleteProduct
);

module.exports = router;