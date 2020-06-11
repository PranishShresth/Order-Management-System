const express = require("express");
const router = express.Router();
const { loginRequired, StayLoggedin } = require("../config/auth");
const User = require("./../models/userModel");
const Cart = require("./../models/cartModel");
const {
  getCategory,
  getCustomer,
  getInventory,
  getNotifications,
  getProducts,
  getOrders,
  getUsers,
} = require("./utils/helper");

//View the customer
router.get("/customer/viewCustomers", loginRequired, async (req, res) => {
  const customers = await getCustomer();
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
    loginerror: req.flash("error"),
    signuperror: req.flash("signuperror"),
    validation: req.flash("validation"),
  });
});

//Dashboard page
router.get("/dashboard", loginRequired, async (req, res) => {
  const customers = await getCustomer();
  const notification = await getNotifications();
  const inventory = await getInventory();
  const products = await getProducts();
  const orders = await getOrders();
  res.render("Dashboards", {
    user: req.session.user,
    notifications: notification,
    title: "Dashboard",
    orders: orders,
    customer: customers,
    products: products,
    inventory: inventory,
  });
});

//Add order page
router.get("/orders/addorder", loginRequired, async (req, res) => {
  const customers = await getCustomer();
  const inventoryproducts = await getInventory();
  res.render("partials/order/addorder", {
    user: req.session.user,
    title: "Add Order",
    customers: customers,
    products: inventoryproducts,
    user: req.session.user,
  });
});

//View the order
router.get("/orders/vieworder", loginRequired, async (req, res) => {
  const orders = await getOrders();
  res.render("partials/order/vieworder", {
    orders: orders,
    title: "View Order",
    user: req.session.user,
  });
});

//Get inventory
router.get("/inventory", loginRequired, async (req, res) => {
  const inventory = await getInventory();
  const customers = await getCustomer();
  const categories = await getCategory();
  const orders = await getOrders();
  res.render("partials/inventory", {
    user: req.session.user,
    title: "Inventory",
    inventory: inventory,
    category: categories,
    customer: customers,
    orders: orders,
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
    error: req.flash("error"),
  });
});

//profile page
router.get("/profile", loginRequired, async (req, res) => {
  const users = await getUsers();
  res.render("Profile", {
    user: req.session.user,
    users: users,
    title: "Profile",
  });
});

//product
router.get("/products/addProduct", loginRequired, async (req, res) => {
  const categories = await getCategory();
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

  let products = await getProducts();
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
    await res.redirect("/ecommerce");
  } else {
    res.redirect("/ecommerce");
  }
});

router.get("/wishlist/clear", loginRequired, async (req, res) => {
  req.session.WatchList = [];
  res.redirect("/product/viewlater");
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
  const user = await getUsers();
  const orders = await getOrders();
  const cust = await getCustomer();
  await res.render("partials/resource/resource", {
    onlineAccounts: user.length,
    title: "Resource",
    cust: cust,
    user: req.session.user,
    orders: orders,
  });
});
