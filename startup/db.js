const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');

module.exports = async function () {
  try {
    await mongoose.connect(config.get('db.address'));
    console.log('Connected to MongoDB');

    // حذف تمامی ایندکس‌های یکتایی برای مجموعه products
    await mongoose.connection.db.collection('products').dropIndexes();
    console.log('All unique indexes for products collection have been dropped');

    // حذف تمامی ایندکس‌های یکتایی برای مجموعه users
    await mongoose.connection.db.collection('users').dropIndexes();
    console.log('All unique indexes for users collection have been dropped');

    mongoose.set('strictQuery', false);
    console.log('strictQuery set to false');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};