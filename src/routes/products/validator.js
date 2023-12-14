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
        check('price')
        .isNumeric()
        .withMessage('قیمت محصول باید عدد باشد'),
      check('numberOfProduct')
        .not()
        .isEmpty()
        .withMessage('تعداد موجودی محصول نباید خالی باشد'),
        check('numberOfProduct')
        .isNumeric()
        .withMessage('تعداد محصول باید عدد باشد'),
      check('description')
        .not()
        .isEmpty()
        .withMessage('توضیحات محصول نباید خالی باشد'),
        check('serialNumber')
        .not()
        .isEmpty()
        .withMessage('شماره سریال محصول نباید خالی باشد'),
    ]
  }

  addDiscount(){
    return [
      check('selectedProducts')
        .not()
        .isEmpty()
        .withMessage('محصولی برای ایجاد تخفیف انتخاب نشده'),
        check('discountId')
        .not()
        .isEmpty()
        .withMessage('تخفیف مشخص نشده'),
    ]
  }

  likeValidator(){
    return [
      check('id')
        .not()
        .isEmpty()
        .withMessage('کاربری یافت نشد'),
    ]
  }
}