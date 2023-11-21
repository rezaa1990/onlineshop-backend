const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  commentValidator(){
    return [
      check('author')
        .not()
        .isEmpty()
        .withMessage('برای ثبت نظر باید ثبت نام کنید'),
        check('text')
        .not()
        .isEmpty()
        .withMessage('فیلد کامنت نباید خالی باشد'),
    ]
  }
}