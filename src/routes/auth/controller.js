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

   async resetPasswordEmail(req, res) {
  try {
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
    user.resetCode = resetCode;
    user.resetCodeExpiration = new Date(Date.now() + 60 * 60 * 1000); // یک ساعت اعتبار
    await user.save();

    const mailOptions = {
      from: 'rezshop8@gmail.com',
      to: user.email,
      subject: 'بازیابی رمز عبور سایت رضشاپ',
      text: `کد بازیابی رمز عبور در سایت rezshop:${resetCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        this.response({ res, code: 440, message: "خطا در ارسال ایمیل بازیابی رمز عبور", data: { error: error } });
      } else {
        console.log('Email sent: ' + info.response);
        this.response({ res, message: "ایمیل بازیابی رمز عبور ارسال شد", data: { info: info } });
      }
    });
  } catch (err) {
    console.error("Error in resetPasswordEmail:", err);
    this.response({ res, code: 500, message: "خطا در بازیابی رمز عبور", data: {} });
  }
}


async resetPassword(req, res) {
  const user = await this.User.findOne({ email: req.body.email });
  if (!user) {
    return this.response({
      res,
      code: 400,
      message: "کاربری با این ایمیل وجود ندارد",
    });
  }
  if (req.body.resetCode !== user.resetCode || new Date() > user.resetCodeExpiration) {
        return this.response({ res, message: "کد بازیابی رمز عبور معتبر نیست", data: {} });
  } 
  if (req.body.newPassword !== req.body.RepeatNewPassword ) {
    return this.response({ res, message: "رمز عبور جدید و تکرار آن برابر نیست", data: {} });
  } else {
  try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  
      user.password = hashedPassword;
      await user.save();
      this.response({ res, message: "رمز عبور با موفقیت تغییر یافت", data: {} });
  } catch (error) {
      console.error("Error in hashing password:", error);
      this.response({ res, code: 500, message: "خطا در تغییر رمز عبور", data: {} });
    }
  }
}




})();