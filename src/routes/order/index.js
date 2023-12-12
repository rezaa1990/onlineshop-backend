const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

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

module.exports = router;