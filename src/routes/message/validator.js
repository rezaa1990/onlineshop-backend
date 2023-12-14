const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  messageValidator(){
    return [
      check('senderName')
        .not()
        .isEmpty()
        .withMessage('نام فرستنده خالی است'),
        check('senderEmail')
        .not()
        .isEmpty()
        .withMessage('ایمیل خالی است'),
        check('senderEmail')
        .isEmail()
        .withMessage('ایمیل صحیح نیست'),
        check('content')
        .not()
        .isEmpty()
        .withMessage('پیِام خالی است'),
    ]
  }
}