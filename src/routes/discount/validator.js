const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  commentValidator(){
    return [
      check('text')
        .not()
        .isEmpty()
        .withMessage('فیلد کامنت نباید خالی باشد')
    ]
  }
}