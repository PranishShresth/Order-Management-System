const express = require("express");
const Router = express.Router();
const Product = require("../../models/productModel");

//api for getting products
Router.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.status(201).json(products);
});

//api for posting products
Router.post("/products", async (req, res) => {
  console.log(req.body);
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productThumbnail,
  } = req.body;
  const product = new Product({
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productCategory: productCategory,
    productThumbnail: productThumbnail,
  });
  try {
    const newProduct = await product.save();
    res.redirect("/products/addProduct");
  } catch (err) {
    if (err) throw err;
  }
});

module.exports = Router;
