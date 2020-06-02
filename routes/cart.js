const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");

router.post("/list/:productid", async (req, res) => {
  const userid = req.session.user._id;
  const productid = req.params.productid;
  const quantity = req.body.quantity;
  const cart = new Cart({
    User: userid,
    Product: productid,
    Quantity: quantity,
  });
  await cart.save();
  res.redirect("/ecommerce");
});

router.get("/list", async (req, res) => {
  console.log(req.session);
  const cart = await Cart.find({})
    .populate("User Product")
    .exec((err, result) => {
      if (result) {
        res.status(201).json(result);
      } else {
        res.json({
          error: "Error",
        });
      }
    });
});
module.exports = router;
