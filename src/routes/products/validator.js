const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  productsValidator(){
    return [
      check('category')
        .not()
        .isEmpty()
        .withMessage('دسته بندی محصول نباید خالی باشد'),
      check('name')
        .not()
        .isEmpty()
        .withMessage('نام محصول نباید خالی باشد'),
      check('price')
        .not()
        .isEmpty()
        .withMessage('قیمت محصول نباید خالی باشد'),
      check('numberOfProduct')
        .not()
        .isEmpty()
        .withMessage('تعداد موجودی محصول نباید خالی باشد'),
      check('serialNumber')
        .not()
        .isEmpty()
        .withMessage('شماره سریال محصول نباید خالی باشد'),
        
    ]
  }
}