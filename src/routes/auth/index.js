const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post(
  '/register',
  validator.registerValidator(),
  controller.validate,
  controller.register
);

router.post(
  '/login',
  validator.loginValidator(),
  controller.validate,
  controller.login
);

router.put(
  '/resetpassword',
  validator.resetPasswordValidator(),
  controller.validate,
  controller.resetPassword
);

module.exports = router;