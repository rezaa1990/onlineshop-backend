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

  async removeFromBasket(req, res) {
    try {
      const { userId, basketId } = req.body;
  
      const user = await this.User.findById(userId);
      if (!user) {
        return this.response({ res, message: 'کاربر پیدا نشد', code: 404 });
      }
      const basketid = await this.Product.findById(basketId);
      if (!basketid) {
        return this.response({ res, message: 'محصوول پیدا نشد', code: 404 });
      }
      const index = user.basket.indexOf(basketId);
      console.log("index", index);
      user.basket = user.basket.filter(p => p.toString() !== basketId);
      user.numberOfEachProductInBasket = user.numberOfEachProductInBasket.filter((n,i)=>i !== index);
  
      await user.save();
      this.response({ res, message: 'محصول از سبد شما حذف شد', code: 200, data: { user } });
    } catch (error) {
      console.error('Error removing from basket:', error);
      this.response({ res, message: 'خطا در حذف محصول از سبد', code: 500 });
    }
  }
  

async me(req, res) {
  try {
    const user = await this.User.findById(req.user._id).select('+email +mobile').populate({
      path: 'basket',
      populate: [
        { path: 'images', model: 'Image' }
      ]
    }).exec(); // افزودن exec() برای اجرای Query
    console.log("usus", user);
    this.response({ res, data: user });
  } catch (error) {
    console.error(error);
    this.response({ res, status: 500, message: 'خطا در دریافت اطلاعات کاربر' });
  }
}


})();
