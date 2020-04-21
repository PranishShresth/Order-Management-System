const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  res.render("registration", { layout: "layouts/registration-layout" });
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboards", {
    user: req.user,
  });
});
router.get("/addorder", (req, res) => {
  res.render("partials/addorder");
});
router.get("order/vieworder", (req, res) => {
  res.render("partials/vieworder");
});
router.get("/inventory", (req, res) => {
  res.render("partials/inventory");
});

module.exports = router;
