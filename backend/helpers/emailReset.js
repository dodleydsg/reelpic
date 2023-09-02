const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.EMAIL_PASS
  },
});

async function sendMail(options,user) {

  const HTML_MESSAGE = `
  <div style="margin-bottom: 16px; margin-top: 16px;">
  <h1 style="text-align: center;">Reelpic</h1>
  <h2 style="text-align: center; margin-bottom: 4rem">Password reset</h2>

  <p style="text-align: center;">
    Someone requested that the password be reset for the following account:
  </p>
  <p style="text-align: center;">
    To reset your password visit the following address
  </p>
    <a
      href="${options.text}"
      style="text-align: center;"
      >Click to reset password</a
    >
  <p style="text-align: center;">Your email: <b>${user.email}</b></p>
  <p style="text-align: center;">
    If this was a mistake, just ignore this email and nothing will happend
  </p>
</div>
  `
  options.html = HTML_MESSAGE  
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
