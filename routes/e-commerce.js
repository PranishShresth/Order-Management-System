const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
router.get("/product/viewDetail/:id", async (req, res) => {
  let products = await Product.findById(req.params.id);

  res.render("partials/ecommerce/viewDetails", {
    title: "Product Details",
    products: products,
    user: req.session.user,
  });
});

module.exports = router;
