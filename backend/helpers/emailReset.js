import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "felicity.simonis@ethereal.email",
    pass: "nmgSq9j3FDV4hy3ast",
  },
  streamTransport: true,
});

export async function sendMail({ from, to, subject, body }) {
  let options = {
    ...arguments["0"],
  };
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
}
