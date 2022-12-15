const nodemailer = require("nodemailer");
require("dotenv").config();
const {
  NODEMAILER_AUTH_USER,
  NODEMAILER_AUTH_PASS } = process.env;

async function sendEmail({ email, verificationToken }) {
  const URL = `localhost:3000/api/users/verify/${verificationToken}`;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: NODEMAILER_AUTH_USER,
      pass: NODEMAILER_AUTH_PASS,
    },
  });

  const emailBody = {
    from: "info@contacts.com",
    to: email,
    subject: "Please verify your email",
    html: `<h3> Please open this link: ${URL} to verify your email <h3>`,
    text: `Please open this link: ${URL} to verify your email`,
  };

  const response = await transport.sendMail(emailBody);
  console.log("Email sent", response);
}

module.exports = {
  sendEmail
};
