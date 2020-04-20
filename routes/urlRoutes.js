const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("registration", { layout: "layouts/registration-layout" });
});
router.get("/dashboard", (req, res) => {
  res.render("dashboards");
});
router.get("/addorder", (req, res) => {
  res.render("partials/addorder");
});
router.get("order/vieworder", (req, res) => {
  res.render("partials/vieworder");
});

module.exports = router;
