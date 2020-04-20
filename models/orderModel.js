const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
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
