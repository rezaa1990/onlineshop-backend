const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');

module.exports = function(){
  mongoose.set('strictQuery', false);
  mongoose
  .connect(config.get('db.address'))
  .then(() => debug("connected to mongodb"))
  .catch(() => debug("could not connect to mndb"));
}