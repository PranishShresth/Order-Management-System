const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const loginRequired = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ status: "Please log in" });
  return next();
};

const StayLoggedin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  return next();
};

//View the customer
router.get("/customer/viewCustomers", loginRequired, async (req, res) => {
  const url = "http://localhost:3010/customer/api/viewCustomers";
  let response = await fetch(url);
  let customers = await response.json();
  res.render("partials/viewCustomers", {
    customers: customers,
  });
});
// Add the customer
router.get("/customer/addCustomers", loginRequired, (req, res) => {
  res.render("partials/addCustomer");
});

//Registration page
router.get("/", StayLoggedin, (req, res) => {
  res.render("registration", {
    layout: "layouts/registration-layout",
    errors: req.session.errors,
  });
});

//Dashboard page
router.get("/dashboard", loginRequired, (req, res) => {
  res.render("dashboards", {
    user: req.session.user,
  });
});

//Add order page
router.get("/orders/addorder", loginRequired, (req, res) => {
  res.render("partials/addorder", {
    user: req.session.user,
  });
});

//View the order
router.get("/orders/vieworder", loginRequired, async (req, res) => {
  const url = "http://localhost:3010/orders/api/viewOrder";
  let response = await fetch(url);
  let orders = await response.json();
  res.render("partials/vieworder", { orders: orders });
});

//Get inventory
router.get("/inventory", loginRequired, (req, res) => {
  res.render("partials/inventory", {
    user: req.session.user,
  });
});

//Logout
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
