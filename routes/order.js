const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");

//Getting all orders

router.get("/vieworder", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("<h1>Access Denied</h1>");
  }
  const orders = await Order.find({});
  res.render("partials/vieworder", { orders: orders });
});

router.post("/", async (req, res) => {
  const order = new Order({
    id: uuidv4(),
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    status: req.body.status,
    price: req.body.price,
    totalAmount: req.body.amount,
  });
  try {
    const newOrder = await order.save();
    res.redirect("dashboard");
  } catch (err) {
    if (err) throw err;
    res.status(500).json({
      message: err.message,
    });
  }
});
//export module
module.exports = router;
