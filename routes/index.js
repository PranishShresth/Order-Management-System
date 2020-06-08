const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { loginRequired, StayLoggedin } = require("../config/auth");
const User = require("./../models/userModel");
const Cart = require("./../models/cartModel");

//View the customer
router.get("/customer/viewCustomers", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "customer/api/viewCustomers";
  let response = await fetch(url);
  let customers = await response.json();
  res.render("partials/customer/viewCustomers", {
    customers: customers,
    title: "View Customer",
    user: req.session.user,
  });
});
// Add the customer
router.get("/customer/addCustomers", loginRequired, async (req, res) => {
  res.render("partials/customer/addCustomer", {
    title: "Add customer",
    user: req.session.user,
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
  const response = await fetch(process.env.SERVER + "api/notification");
  const notifications = await response.json();
  const notification = await notifications
    .splice(notifications.length - 5)
    .reverse();
  res.render("Dashboards", {
    user: req.session.user,
    notifications: notification,
    title: "Dashboard",
  });
});

//Add order page
router.get("/orders/addorder", loginRequired, async (req, res) => {
  const customerurl = process.env.SERVER + "customer/api/viewCustomers";
  let custresponse = await fetch(customerurl);
  let customers = await custresponse.json();

  //product
  const url = process.env.SERVER + "inventory/inventoryDetails";
  let response = await fetch(url);
  let products = await response.json();
  res.render("partials/order/addorder", {
    user: req.session.user,
    title: "Add Order",
    customers: customers,
    products: products,
    user: req.session.user,
  });
});

//View the order
router.get("/orders/vieworder", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "orders/api/viewOrder";
  let response = await fetch(url);
  let orders = await response.json();
  res.render("partials/order/vieworder", {
    orders: orders,
    title: "View Order",
    user: req.session.user,
  });
});

//Get inventory
router.get("/inventory", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "inventory/inventoryDetails";
  let response = await fetch(url);
  let inventory = await response.json();

  const categoryurl = process.env.SERVER + "category/getCategory";
  let categoryresponse = await fetch(categoryurl);
  let categories = await categoryresponse.json();
  res.render("partials/inventory", {
    user: req.session.user,
    title: "Inventory",
    inventory: inventory,
    category: categories,
  });
});

//Ecommerce
router.get("/ecommerce", loginRequired, (req, res) => {
  res.render("Ecommerce", { title: "E-commerce", user: req.session.user });
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
router.get("/products/addProduct", loginRequired, async (req, res) => {
  const url = process.env.SERVER + "category/getCategory";
  let response = await fetch(url);
  let categories = await response.json();
  res.render("partials/product/addProduct", {
    user: req.session.user,
    title: "Add product",
    category: categories,
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

router.get("/ecommerce/:type", async (req, res, next) => {
  const type = req.params.type;
  console.log(type);
  const url = process.env.SERVER + "api/products";
  let response = await fetch(url);
  let products = await response.json();
  let productchunks = [];
  let chunksize = 999999;
  for (let i = 0; i < products.length; i += chunksize) {
    productchunks.push(products.slice(i, i + chunksize));
  }
  res.render("Epages/category-page", {
    products: productchunks,
    title: type,
    type: type,
    user: req.session.user,
  });
});

//cart routes

router.get("/cart", loginRequired, async (req, res) => {
  if (!req.session.cart) {
    return res.render("shoppingcart", {
      title: "Cart",
      products: null,
      user: req.session.user,
    });
  }
  var cart = new Cart(req.session.cart);
  res.render("shoppingcart", {
    title: "Cart",
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    user: req.session.user,
  });
});

//troubleshoot
router.get("/troubleshoot", (req, res, next) => {
  const report = process.resourceUsage();
  res.json(report);
});

//checkout

router.get("/cart/checkout", loginRequired, async (req, res) => {
  var cart = new Cart(req.session.cart);

  res.render("checkout", {
    title: "Checkout",
    carts: cart.generateArray(),
    totalPrice: cart.totalPrice,
    user: req.session.user,
  });
});

//Watch it later

router.get("/product/viewlater/:name&:id&:price", async (req, res) => {
  const { name, id, price } = req.params;
  const wishList = req.session.WatchList;
  const nameCheck = wishList.filter((item) => item.name == name);
  if (nameCheck.length == 0) {
    const viewitlater = {
      name: name,
      link: `${process.env.SERVER}ecommerce/product/viewDetail/${id}`,
      price: price,
    };
    await wishList.push(viewitlater);
    await res.redirect("/ecommerce/pendantlights");
  } else {
    res.redirect("/ecommerce/pendantlights");
  }
});

router.get("/product/viewlater", loginRequired, async (req, res) => {
  const wishList = req.session.WatchList;

  res.render("watchitLater", {
    watch: wishList,
    title: "Watch it Later",
    user: req.session.user,
  });
});

//Resource section
router.get("/resource", loginRequired, async (req, res) => {
  const user = await User.find({});
  const url = process.env.SERVER + "customer/api/viewCustomers";
  const response = await fetch(url);
  const cust = await response.json();
  await res.render("partials/resource/resource", {
    onlineAccounts: user.length,
    title: "Resource",
    cust: cust,
    user: req.session.user,
  });
});
