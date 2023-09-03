const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.EMAIL_PASS
  },
});

async function sendMail(options,user) {

  let HTML_MESSAGE = `<div style="display:flex;flex-direction:column;margin-bottom:16px;margin-top:16px;"><h1 style="text-align: center;">Reelpic</h1>
    <h2 style="text-align: center;">Password reset</h2>
    <p style="text-align: center;">
      Someone requested that the password be reset for the following account:
    </p>
    <p style="text-align: center;">
      To reset your password visit the following address
    </p>
    <a href="${options.text}" target="_blank" style="border-radius:.5rem;text-align:center;display:inline-block;padding:1rem 2rem;background-color:rgb(101 31 255);color:white;font-weight:800;margin:0auto;text-decoration:none;">Click to reset password
    </a>
    <p style="text-align: center;">Your email: <b>${user.email}</b></p>
    <p style="text-align: center;">
      If this was a mistake, just ignore this email and nothing will happen. Copy the text below and paste in a web browser, if the link above doesn't work. <br>
      ${options.text}
      <br>
      <b>Don't share this link</b>
    </p>

  </div>`
  ;
  HTML_MESSAGE = HTML_MESSAGE.replace(/(\r\n|\n|\r)/gm," ")
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
