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
    if(user.basket.includes(req.body.productId)) return (this.response({res,message:'این محصول در سبد شما موجود است'}))
    user.basket=[...user.basket,req.body.productId]
    user.numberOfEachProductInBasket=[...user.numberOfEachProductInBasket,req.body.numberOfproduct];
    console.log(user);
    await user.save();
    this.response({ res, message: "محصول به سبد شما افزوده شد", code:200, data: { user } });
  }

  async removeFromBasket(req, res){
    console.log('body:',req.body)
    const user = await this.User.findById(req.body.userId);
    const basketId = req.body.basketId;
    console.log('basket1:',user.basket); 
    user.basket=user.basket.filter(p => p.toString() !== basketId);
    console.log('basket2:',user.basket);
    await user.save();
    this.response({ res, message: "محصول از سبد شما حذف شد", code:200, data: { user } });
  }

  async me(req, res){
    this.response({res,data:req.user})
    }
})();
