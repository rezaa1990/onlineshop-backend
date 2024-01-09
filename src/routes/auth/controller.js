const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rezshop8@gmail.com',
    pass: 'gwds glsk bvir nkpr'
  }
});


module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "این یوزر قبلا ثبت نام کرده است",
      });
    }
    if(req.body.password !== req.body.repeatPassword){
      return this.response({
        res,
        code: 401,
        message: "مقادیر رمز عبور و تکرار آن برابر نیستند",
      });
    }
    const salt = await bcrypt.genSalt(10);
    console.log(req.body);
    const password = await bcrypt.hash(req.body.password, salt);
    user = new this.User(_.pick(req.body, ["fName", "mobile", "email","password"]));
    user.role = "normalUser"
    user.password=password;
    await user.save();
    this.response({
      res,
      message: "ثبت نام با موفقیت انجام شد",
      data: _.pick(user, ["fname", "mobile", "email"]),
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const role = user.role;
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "successfuly logged in", data: { token,role} });
  }

    async resetPassword(req, res) {
      console.log("resetPasswordddddddd")
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "کاربری با این ایمیل وجود ندارد",
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: 'rezshop8@gmail.com',
      to: user.email,
      subject: 'بازیابی رمز عبور',
      text: `کد بازیابی رمز عبور در سایت rezshop:${resetCode}`
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      this.response({ res,code: 440, message: "خطا در ارسال ایمیل بازیابی رمز عبور", data: {error:error}});
      // اگر خطا رخ داد، باید اطلاعات خطا به کاربر نمایش داده شود
    } else {
      console.log('Email sent: ' + info.response);
      this.response({ res, message: "ایمیل بازیابی رمز عبور ارسال شد", data: {info:info} });
     // اگر ارسال ایمیل با موفقیت انجام شد، باید پیام موفقیت‌آمیز به کاربر نمایش داده شود
    }
  });
  }
})();