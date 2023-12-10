const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/makecomment/:id',
  isLoggined,
  validator.commentValidator(),
  controller.validate,
  controller.makeComment,
);

router.delete(
  '/deletecomment/:id',
  isLoggined,
  isAdmin,
  controller.deleteComment
);

router.put(
  '/approvecomment/:id',
  isLoggined,
  isAdmin,
  controller.approveComment
);

router.put(
  '/likecomment/:commentid/:userid',
  isLoggined,
  // isAdmin,
  controller.likeComment
);

router.put(
  '/replycomment/:id',
  isLoggined,
  // isAdmin,
  controller.replyComment
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



module.exports = router;