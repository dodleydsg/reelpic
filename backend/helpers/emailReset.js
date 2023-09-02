const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.EMAIL_PASS
  },
});

async function sendMail(options) {
  console.log(options)
  await transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
}

module.exports = sendMail;
