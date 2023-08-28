const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "dodleydesign@gmail.com",
  port: 587,
  auth: {
    user: "dodleydesign@gmail.com",
    pass: "nd1d0d13y",
  },
});

async function sendMail({ from, to, subject, body }) {
  let options = {
    ...arguments["0"],
  };
  await transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
}

module.exports = sendMail;
