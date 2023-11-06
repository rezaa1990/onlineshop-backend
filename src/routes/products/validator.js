const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  productsValidator(){
    return [
      check('name')
        .not()
        .isEmpty()
        .withMessage('نام محصول نباید خالی باشد'),
        check('imagePath')
        .not()
        .isEmpty()
        .withMessage('عکس محصول نباید خالی باشد'),
        check('price')
        .not()
        .isEmpty()
        .withMessage('قیمت محصول نباید خالی باشد'),
        check('price')
        .not()
        .isNumeric()
        .withMessage('قیمت محصول باید عدد باشد'),
        check('description')
        .not()
        .isEmpty()
        .withMessage('توضیحات محصول نباید خالی باشد'),
        
    ]
  }
}