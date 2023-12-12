const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  discountValidator() {
    return [
      check('type')
        .not()
        .isEmpty()
        .withMessage('نوع تخفیف را مشخص کنید'),
      check('value')
        .not()
        .isEmpty()
        .withMessage('میزان تخفیف را مشخص کنید')
        .isFloat({ min: 0, max: 1 })
        .withMessage('میزان تخفیف باید بین صفر و یک باشد'),
      check('expirationTime')
        .not()
        .isEmpty()
        .withMessage('تاریخ انقضای تخفیف را مشخص کنید'),
      check('expirationTime')
        .isNumeric()
        .withMessage('تاریخ انقضا باید عدد باشد')
    ];
  }
  
}