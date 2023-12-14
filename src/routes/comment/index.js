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
  controller.likeComment
);

router.post(
  '/makereplycomment',
  isLoggined,
  controller.validate,
  controller.makeReplyComment
);


router.put(
  '/addReplyComment',
  isLoggined,
  controller.validate,
  controller.addReplyComment
);

module.exports = router;