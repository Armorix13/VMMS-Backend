require("dotenv").config();
const nodemailer = require('nodemailer');
const config = require('../../Config/config');

const transport = nodemailer.createTransport(config.email.smtp);
transport
  .verify()
  .then(() =>console.log('Connected to email server'))
  .catch(() => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));


const sendMail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

module.exports = sendMail;
