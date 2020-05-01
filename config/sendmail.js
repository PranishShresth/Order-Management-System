const nodemailer = require("nodemailer");

const sendmail = (username, email, output, subjects, texts) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ordermanagementsystem2@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Order Management System" <ordermanagementsystem2@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subjects, // Subject line
    text: texts, // plain text body
    html: `<p>Dear ${username},<p><br>` + output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

exports.module = sendmail;
