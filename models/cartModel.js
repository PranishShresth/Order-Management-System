const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    Quantity: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
