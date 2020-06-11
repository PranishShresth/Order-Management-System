const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

//reset pasword route
router.post("/reset", async (req, res, next) => {
  const user = await User.findOne({ name: req.body.username });
  if (user) {
    return res.render("resetPassword", {
      layout: "layouts/registration-layout",
      user: user,
      error: req.flash("error"),
    });
  } else {
    req.flash("error", "Error. Such user doesn't exist");
    res.redirect("/registration/resetPassword");
  }
});
router.put("/reset/:user", async (req, res, next) => {
  const { newPassword, confirmPassword, id } = req.body;

  const users = await User.findOne({ _id: id });

  if (newPassword.trim() === confirmPassword.trim()) {
    if (req.body.newPassword.length >= 6) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.newPassword, salt, async function (err, hash) {
          let user;
          try {
            user = await User.findById(req.params.user);
            user.password = hash;
            await user.save();
            res.redirect("/");
          } catch (err) {
            if (err) throw err;
          }
        });
      });
    } else {
      req.flash("error", "Password must be more than 5 character");
      res.render("resetPassword", {
        error: req.flash("error"),
        user: users,
        layout: "layouts/registration-layout",
      });
    }
  } else {
    req.flash("error", "Both password must match");
    res.render("resetPassword", {
      error: req.flash("error"),
      user: users,
      layout: "layouts/registration-layout",
    });
  }
});

//login route
router.post("/login", async (req, res, next) => {
  User.findOne({
    name: req.body.username,
  }).then((user) => {
    if (!user) {
      req.flash("error", "No such user");
      res.redirect("/");
    }
    // Match password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        delete user.password;
        Object.freeze(user);
        req.session.user = user;
        req.session.WatchList = [];

        res.redirect("/dashboard");
      } else if (!isMatch) {
        req.flash("error", "Password not correct");
        res.redirect("/");
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
    check("password", "Password must be atleast 6 character long").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      var validationerror = errors.array();
      req.flash("validation", validationerror);
      res.redirect("/");

      return;
    }
    const emailExists = await User.find({ email: req.body.email });
    if (emailExists.length === 0) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          const user = new User({
            email: req.body.email.trim(),
            name: req.body.username.trim(),
            password: hash,
          });

          try {
            const newUser = await user.save();
            await sendEmail(req.body.email, req.body.username);
            res.redirect("/");
          } catch (err) {
            if (err) throw err;
            return;
          }
        });
      });
    } else {
      req.flash("signuperror", "Email already exists");

      res.redirect("/");
    }
  }
);
const sendEmail = (touser, user) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: touser,
    from: "ordermanagementsystem2@gmail.com",
    subject: "User registration",
    html: `
    Dear ${user}
    <p>Thank you for registering with Revenant Dawn - Order Management System<p>
    <p>You can now sign in to get full features. If you have any queries, please reply back to this email and we will get back to you as soon as we can.<p>
    <br>
    <footer>
    <p>Kind Regards,<p>
    <p>Revenant Dawn Team</p>
    <p>Sydney, NSW</p
    </footer>
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
