const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const { isLoggined, isAdmin } = require('../../middlewares/auth');

router.post(
  '/addorder',
  validator.order(),
  controller.validate,
  controller.addOrder,
);

router.put(
  '/addpostalinformation/:id',
  validator.postalInformation(),
  controller.validate,
  controller.addPostalInformation,
);

router.get(
  '/getorder',
  isLoggined,
  isAdmin,
  controller.getOrder,
);

router.put(
  '/sendtopostorder',
  isLoggined,
  isAdmin,
  controller.sendToPostOrder,
);

module.exports = router;