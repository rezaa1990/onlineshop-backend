const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");

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
})();