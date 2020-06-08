const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

router.post("/resource/feedback", async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  await sendEmail(name, phone, message, email);
  res.redirect("/resource");
});

const sendEmail = (user, phone, message, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "ordermanagementsystem2@gmail.com",
    from: "ordermanagementsystem2@gmail.com",
    subject: `Feedback from ${user}`,
    html: `<p>Name: ${user}</p>
      <p> Phone: ${phone} </p>
      <p> Email: ${email}</p>
      <p> Message: ${message}</p>
      `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.log(error.response.body);
      // console.log(error.response.body.errors[0].message)
    });
};

module.exports = router;
