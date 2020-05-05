const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
  },
  productThumbnail: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
