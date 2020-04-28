const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  User.findOne({
    name: req.body.username,
  }).then((user) => {
    var sessionData = req.session;
    sessionData.user = user;
    if (!user) {
      console.log("error");
    }
    // Match password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.redirect("/dashboard");
      } else {
        console.log("not match");
      }
    });
  });
});

// signup and email send
router.post(
  "/signup",
  [
    // username must be an email
    check("email").isEmail().normalizeEmail(),

    check("username", "Username must not be empty").notEmpty(),
    // password must be at least 5 chars long
    check("password", "Password must be atleast 5 character long").isLength({
      min: 5,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      var validationerror = errors.array();
      console.log(validationerror);
      req.session.errors = validationerror;
      res.redirect("/");

      return;
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const user = new User({
          email: req.body.email,
          name: req.body.username,
          password: hash,
        });

        try {
          const newUser = await user.save();
          sendmail(req.body.username, req.body.email);
          res.redirect("/");
        } catch (err) {
          if (err) throw err;
          return;
        }
      });
    });
  }
);

//sending email function
const sendmail = (username, email) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ordermanagementsystem2@gmail.com", // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  output = `
    <p>Dear ${username},<p>
    <p>Thank you for registering with Revenant Dawn - Order Management System<p>
    <p>You can now sign in to get full features. If you have any queries, please reply back to this email and we will get back to you as soon as we can.<p>
    <br>
    <footer>
    <p>Kind Regards,<p>
    <p>Revenant Dawn Team</p>
    <p>Sydney, NSW</p
    </footer>
    `;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Order Management System" <noreply@oms.com>', // sender address
    to: email, // list of receivers
    subject: "User registration", // Subject line
    text: "Successful registration", // plain text body
    html: output, // html body
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

module.exports = router;
