const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rezshop8@gmail.com',
    pass: process.env.node_mailer_password
  }
});

module.exports = transporter;
