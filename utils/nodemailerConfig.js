const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
      email: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  mailOptions = {
    from: `multi-user blog api ${process.env.USER_EMAIL}`,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
