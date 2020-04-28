const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");

//Getting all orders

router.get("/api/viewOrder", async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

//Searching order
router.get("/search", async (req, res) => {
  if (req.query.search) {
    const userRegex = new RegExp(req.query.search, "i");

    Order.find({ name: userRegex }, function (err, orders) {
      if (err) {
        res.send("error");
      } else {
        res.render("partials/vieworder", { orders: orders });
      }
    });
  }
});

//
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
