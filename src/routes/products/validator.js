const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  productsValidator(){
    return [
      check('name')
        .not()
        .isEmpty()
        .withMessage('نام محصول نباید خالی باشد'),
        check('price')
        .not()
        .isEmpty()
        .withMessage('قیمت محصول نباید خالی باشد'),
        check('description')
        .not()
        .isEmpty()
        .withMessage('توضیحات محصول نباید خالی باشد'),
        check('imgPath')
        .not()
        .isEmpty()
        .withMessage('تصویر محصول نباید خالی باشد'),
        
    ]
  }
}