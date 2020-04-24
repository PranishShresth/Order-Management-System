const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
          res.redirect("/");
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
