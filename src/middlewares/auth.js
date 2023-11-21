const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const debug = require('debug')("app:main");

async function isLoggined(req,res,next){
  const token = req.header('token1')
  debug("token00:",token)
  if(!token) res.status(401).send('access denied');
  try{
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded._id).populate('basket');
    console.log(user);
    req.user = user;
    next();
  }catch(ex){
    res.status(400).send('invalid token');
  }
}

async function isAdmin(req,res,next){
  if(!req.user.isadmin) res.status(403).send('access denied');
  next();
}

module.exports = {
  isLoggined, isAdmin
}