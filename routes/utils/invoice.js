const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { loginRequired, StayLoggedin } = require("../../config/auth");

router.get(
  "/cart/invoice",
  loginRequired,

  async (req, res, next) => {
    const url = process.env.SERVER + "/cart/list";
    const response = await fetch(url);
    const cartitems = await response.json();
    res.render("utils/invoice", {
      cart: cartitems,
      layout: "layouts/blank",
      user: req.session.user,
      bill: req.session.bill,
    });
  }
);
router.post("/cart/details", loginRequired, async (req, res) => {
  let billuser = {
    name: req.body.firstName,
    email: req.body.email,
    address: req.body.address,
  };
  req.session.bill = await billuser;
  await res.redirect("/cart/invoice");
});

module.exports = router;
