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
        message: "this user already registered",
      });
    }
    // const {email, name, password} = req.body;
    // user = new this.User({email, name, password});
    const salt = await bcrypt.genSalt(10);
    console.log(req.body);
    const password = await bcrypt.hash(req.body.password, salt);
    user = new this.User(_.pick(req.body, ["fName", "lName", "mobile", "email","address","postalCode","isadmin"]));
    user.password=password;



    await user.save();

    this.response({
      res,
      message: "the user successfuly registered",
      data: _.pick(user, ["fname", "lname", "mobile", "email","address","postalcode","isadmin"]),
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
    const isAdmin = user.isadmin;
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "successfuly logged in", data: { token,isAdmin} });
  }
})();