const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const {isLoggined , isAdmin} = require('./../../middlewares/auth')

router.post(
  '/addmessage',
  validator.messageValidator(),
  controller.validate,
  controller.addMessage,
);

router.get(
  '/getmessages',
  isLoggined,
  isAdmin,
  controller.getMessages,
);

module.exports = router;