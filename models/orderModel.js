const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  productName: {
    type: String,
    trim: true,
    required: true,
  },

  customer: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
