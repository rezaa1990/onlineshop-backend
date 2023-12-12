const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/addimage',
  // validator.productsValidator(),
  // controller.validate,
  controller.addImage,
);

router.get(
  '/',
 
);

module.exports = router;