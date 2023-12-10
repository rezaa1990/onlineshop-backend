const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const adminRouter = require('./admin');
const productsRouter = require('./products');
const messageRouter = require('./message');
const orderRouter = require('./order');
const discountRouter = require('./discount');
const commentRouter = require('./comment');
const {isLoggined , isAdmin} = require('./../middlewares/auth')
const error = require('./../middlewares/error');

router.use('/auth', authRouter);

router.use('/user',isLoggined,userRouter);

router.use('/admin', isLoggined, isAdmin, adminRouter);

router.use('/products', productsRouter);

router.use('/comment',commentRouter);

router.use('/message',messageRouter);

router.use('/order',orderRouter);

router.use('/discount',discountRouter);

router.use(error);

module.exports = router;