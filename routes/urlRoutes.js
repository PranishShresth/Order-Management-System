const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  var sessiondata = req.session;

  res.render("registration", { layout: "layouts/registration-layout" });
});
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Access Denied");
  }

  res.render("dashboards", {
    user: req.session.user,
  });
});
router.get("/orders/addorder", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Access Denied");
  }

  res.render("partials/addorder", {
    user: req.session.user,
  });
});

router.get("/inventory", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Access Denied");
  }
  res.render("partials/inventory", {
    user: req.session.user,
  });
});

router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;
