const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rezshop8@gmail.com',
    pass: 'gwds glsk bvir nkpr'
  }
});

module.exports = transporter;
