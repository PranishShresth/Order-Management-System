const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
router.get("/add-to-cart/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/ecommerce");
  });
});

//counter middleware for making sure that promo code is not use indefintely
let count = 0;

function countMiddleware(req, res, next) {
  count++;
  if (next) next();
}

//cart
router.post("/promocode", countMiddleware, function (req, res, next) {
  if (count < 2) {
    const { promo } = req.body;

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const promocodes = [
      "Pranish",
      "Nabin",
      "Madan",
      "Paras",
      "Kanchan",
      "Ahmed",
      "Nellai",
    ];
    const filter = promocodes.filter((name) => {
      return name == promo;
    });
    if (filter.length == 1) {
      cart.totalPrice = cart.totalPrice - 0.2 * cart.totalPrice;
      req.session.cart = cart;
      res.redirect("/cart/checkout");
    } else {
      res.redirect("/cart/checkout");
    }
  }
  res.redirect("/cart/checkout");
});
router.get("/reduce/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

router.get("/remove/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

module.exports = router;
