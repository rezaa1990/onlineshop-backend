const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  productsValidator(){
    return [
      check('imageName')
        .not()
        .isEmpty()
        .withMessage('نام تصویر نباید خالی باشد'),
        check('image')
        .not()
        .isEmpty()
        .withMessage(' تصویری انتخاب نشده'),
        check('imagePath')
        .not()
        .isEmpty()
        .withMessage(' مسیر ذخیره سازی تصویر انتخاب نشده'),
    ]
  }
}