const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async addMessage(req, res) {
    const message = new this.Message({
      sender:req.body.senderName,
      email:req.body.senderEmail,
      content:req.body.content,
    });
    await message.save();
    this.response({
      res,
      message: "پیام با موفقیت ارسال شد",
      data: _.pick(message, ["sender", "email",, "content"]),
    });
  }
  async getMessages(req, res) {
    const message = await this.Message.find();
    console.log(message);
    this.response({ res, message: "همه ی پیامها", code: 200, data: { message } });
  }

})();