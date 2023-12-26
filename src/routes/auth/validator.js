const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  registerValidator(){
    return [
      check('fName')
      .not()
      .isEmpty()
      .withMessage(' نام کاربر اجباری است.'),

      check('mobile')
      .not()
      .isEmpty()
      .withMessage('شماره موبایل الزامی است.'),

      check('email')
      .isEmail()
      .withMessage('آدرس ایمیل معتبر نیست. '),

      check('email')
      .not()
      .isEmpty()
      .withMessage('آدرس ایمیل الزامی است.'),

      check('password')
      .not()
      .isEmpty()
      .withMessage('پسورد الزامی است. ')
      .isLength({ min: 6, max: 20 })
      .withMessage('رمز عبور باید حداقل ۶ و حداکثر ۲۰ کاراکتر باشد.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .withMessage('رمز عبور باید شامل حروف بزرگ و کوچک، اعداد و علائم باشد.'),

      check('repeatPassword')
      .not()
      .isEmpty()
      .withMessage('.تکرار پسورد الزامی است')
    ]
  }

  loginValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('ایمیل صحیح نیست'),
      check('password')
        .not()
        .isEmpty()
        .withMessage('رمز عبور نباید خالی باشد'),
    ]
  }
}