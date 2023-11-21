const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/addcomment',
  validator.commentValidator(),
  controller.validate,
  controller.addComment,
);

// router.get(
//   '/getproducts',
//   controller.getProduct
// );

// router.put(
//   '/updateproduct/:id',
//   // isLoggined,
//   // isAdmin,
//   validator.productsValidator(),
//   controller.validate,
//   controller.updateProduct
// );

// router.put(
//   '/addlike/:id',
//   // isLoggined,
//   // isAdmin,
//   // validator.productsValidator(),
//   controller.validate,
//   controller.addLike
// );

// router.delete(
//   '/deleteproduct/:id',
//   // isLoggined,
//   // isAdmin,
//   controller.deleteProduct
// );

module.exports = router;