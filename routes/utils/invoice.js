const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { loginRequired, StayLoggedin } = require("../../config/auth");

router.get("/cart/invoice", loginRequired, async (req, res, next) => {
  const url = process.env.SERVER + "/cart/list";
  const response = await fetch(url);
  const cartitems = await response.json();
  res.render("utils/invoice", {
    cart: cartitems,
    layout: "layouts/blank",
    user: req.session.user,
  });
});
module.exports = router;
