const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/creatediscount',
  isLoggined,
  isAdmin,
  validator.discountValidator(),
  controller.validate,
  controller.makeDiscount,
);

module.exports = router;