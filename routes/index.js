const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { loginRequired, StayLoggedin } = require("../config/auth");
const invoice = require("./utils/invoice");
const invoiceIt = require("@rimiti/invoice-it").default;

//View the customer
router.get("/customer/viewCustomers", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "/customer/api/viewCustomers";
  let response = await fetch(url);
  let customers = await response.json();
  res.render("partials/customer/viewCustomers", {
    customers: customers,
    title: "View Customer",
  });
});
// Add the customer
router.get("/customer/addCustomers", loginRequired, (req, res) => {
  res.render("partials/customer/addCustomer", {
    title: "Add customer",
  });
});
router.get("/flash", function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash("failure", "Username or password not correct");
  res.redirect("/");
});
//Registration page
router.get("/", StayLoggedin, (req, res) => {
  res.render("registration", {
    layout: "layouts/registration-layout",
    errors: req.session.errors,
  });
});

//Dashboard page
router.get("/dashboard", loginRequired, async (req, res) => {
  const response = await fetch(process.env.SERVER + "/api/notification");
  const notifications = await response.json();
  res.render("dashboards", {
    user: req.session.user,
    notifications: notifications,
    title: "Dashboard",
  });
});

//Add order page
router.get("/orders/addorder", loginRequired, (req, res) => {
  res.render("partials/order/addorder", {
    user: req.session.user,
    title: "Add Order",
  });
});

//View the order
router.get("/orders/vieworder", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "/orders/api/viewOrder";
  let response = await fetch(url);
  let orders = await response.json();
  res.render("partials/order/vieworder", {
    orders: orders,
    title: "View Order",
  });
});

//Get inventory
router.get("/inventory", loginRequired, (req, res) => {
  res.render("partials/inventory", {
    user: req.session.user,
    title: "Inventory",
  });
});

//Ecommerce
router.get("/ecommerce", loginRequired, (req, res) => {
  res.render("Ecommerce", { title: "E-commerce" });
});

//reset Password
router.get("/registration/resetPassword", (req, res, next) => {
  res.render("resetPasswordf", {
    layout: "layouts/registration-layout",
    errors: req.session.reseterrors,
  });
});

//profile page
router.get("/profile", loginRequired, (req, res) => {
  res.render("Profile", {
    user: req.session.user,
    title: "Profile",
  });
});

//product
router.get("/products/addProduct", loginRequired, (req, res) => {
  res.render("partials/product/addProduct", {
    user: req.session.user,
    title: "Add product",
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

//Ecommerce pages

router.get("/ecommerce/pendantlights", async (req, res, next) => {
  const url = process.env.SERVER + "/api/products";
  let response = await fetch(url);
  let products = await response.json();
  let productchunks = [];
  let chunksize = 999999;
  for (let i = 0; i < products.length; i += chunksize) {
    productchunks.push(products.slice(i, i + chunksize));
  }
  res.render("Epages/clusterPendant", {
    products: productchunks,
    title: "Pendant Lights",
  });
});

//cart routes

router.get("/cart", async (req, res) => {
  const url = process.env.SERVER + "/cart/list";
  const response = await fetch(url);
  const cartitems = await response.json();
  res.render("shoppingcart", {
    title: "Cart",
    products: cartitems,
  });
});

//checkout

router.get("/cart/checkout", async (req, res) => {
  const url = process.env.SERVER + "/cart/list";
  const response = await fetch(url);
  const cartitems = await response.json();
  res.render("checkout", { title: "Checkout", carts: cartitems });
});
