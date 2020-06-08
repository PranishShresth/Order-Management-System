const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.put("/profile/phone/:id", async (req, res) => {
  let user;
  try {
    const { id } = req.params;
    const { phone } = req.body;
    const user = await User.findById(id);
    user.phone = phone;
    await user.save();
    req.session.user = user;
    res.redirect("/profile");
  } catch {
    if (user === null) {
      res.redirect("/dashboard");
    }
  }
});

router.put("/profile/bio/:id", async (req, res) => {
  let user;
  try {
    const { id } = req.params;
    const { bio } = req.body;
    const user = await User.findById(id);
    user.bio = bio;
    await user.save();
    req.session.user = user;
    res.redirect("/profile");
  } catch {
    if (user === null) {
      res.redirect("/dashboard");
    }
  }
});
module.exports = router;
