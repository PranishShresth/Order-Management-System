const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

router.get("/login", (req, res) => {
  res.render("/");
});

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
  // User.findOne({ name: req.body.username }, function (user) {
  //   if (user) {
  //     console.log("found");
  //     bcrypt.compare(password, user.password, (err, isMatch) => {
  //       if (err) throw err;
  //       if (isMatch) {
  //         return res.redirect("/dashboard");
  //       } else {
  //         rs;
  //         console.log("not match");
  //       }
  //       return res.redirect("/dashboard");
  //     });
  //   }
  // });
});

router.post(
  "/signup",
  [
    check("email", "email is required").isEmail(),
    check("username", "name is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const result = validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
      console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
      //response validate data to register.ejs
      res.redirect("/", {
        errors: errors,
      });
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
          // create reusable transporter object using the default SMTP transport
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
          output = `<h4>Dear ${req.body.username}.<h4><br>
          <p>You have succesfully created an account for Order Management System<p>
          <p>You can now sign in to get full features of Order Management System<p>
          `;
          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Order Management System" <noreply@oms.com>', // sender address
            to: req.body.email, // list of receivers
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
            res.redirect("/");
          });
        } catch (err) {
          if (err) throw err;
          res.status(500).json({ message: err.message });
          return;
        }
      });
    });
  }
);

module.exports = router;
