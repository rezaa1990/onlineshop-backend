const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const debug = require('debug')("app:main");

async function isLoggined(req, res, next) {
  const token = req.header('token1');
  
  if (!token){
        res.status(401).json({
      message:"ابتدا باید وارد سایت شوید",
      data:{}
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwt_key'));
    
    // در اینجا بررسی می‌کنیم که زمان اعتبار توکن کمتر از نصف زمان کل اعتبار آن باشد
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;

    if (expirationTime - nowInSeconds < (decoded.exp - decoded.iat) / 2) {
      // اگر زمان اعتبار توکن کم باشد، توکن را تمدید کن
      const newToken = jwt.sign({ _id: decoded._id }, config.get('jwt_key'), { expiresIn: 60 });
      // توکن تمدید شده را به درخواست اضافه کن
      req.token = newToken;
    } else {
      // در غیر این صورت، از توکن اصلی استفاده کن
      req.token = token;
    }

    const user = await User.findById(decoded._id).populate('basket');
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).json({
      message:"ابتدا باید وارد سایت شوید",
      data:{}
    });
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