const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const debug = require('debug')("app:main");

async function isLoggined(req,res,next){
  const token = req.header('token1')
  debug("req:",req.header);
  debug("token00:",token)
  if(!token) return res.status(401).send('توکن نامعتبر است');
  try{
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded._id).populate('basket');
    console.log(user);
    req.user = user;
    next();
  }catch(ex){
    res.status(400).send('ابتدا باید وارد سایت شوید');
  }
}

async function isAdmin(req,res,next){
  if(req.user.role !== "adminUser"){
    res.status(444).send('دسترسی امکان ندارد')
  }else next();
}

module.exports = {
  isLoggined, isAdmin
}