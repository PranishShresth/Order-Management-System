const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("/");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  body("email").isEmail().normalizeEmail(),
    body("username").isEmpty().trim().escape();
  body("password").isEmpty().trim().escape();
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const user = new User({
        email: req.body.email,
        name: req.body.username,
        password: hash,
      });
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
        res.redirect("/");
      } catch (err) {
        if (err) throw err;
        res.status(500).json({ message: err.message });
        return;
      }
    });
  });
});

module.exports = router;
