const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");


module.exports = new (class extends controller {
  async dashboard(req, res){
   res.send('user dashboard')
  }

  async updateUser(req, res){
    console.log(req.params.id,req.body)
    const user = await this.User.findById(req.params.id);
    
    user.basket=req.body.productId;
    console.log(user);
    await user.save();
    this.response({ res, message: "محصول به سبد شما افزوده شد", code:200, data: { user } });
  }

  async me(req, res){
    this.response({res,data:req.user})
    }
})();