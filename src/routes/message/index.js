const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/addmessage',
  // validator.productsValidator(),
  // controller.validate,
  controller.addMessage,
);

router.get(
  '/getmessages',
  controller.getMessages,
);

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

// router.put(
//   '/addcomment',
//   // validator.productsValidator(),
//   controller.validate,
//   controller.addComment
// );

// router.delete(
//   '/deleteproduct/:id',
//   // isLoggined,
//   // isAdmin,
//   controller.deleteProduct
// );

module.exports = router;