const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' })); // برای JSON داده‌ها
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000', // آدرس مرورگر شما
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); // tanzimate server



const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');
const winston = require('winston');

const router = require('./src/routes');

require('./startup/config')(app,express);
require('./startup/db')();
require('./startup/logging')();


app.use('/api', router);


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`listening on port ${port}`));