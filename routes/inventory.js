const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventoryModel");

router.get("/inventoryDetails", async (req, res, next) => {
  const inventory = await Inventory.find();
  res.json(inventory);
});
router.post("/addInventory", async (req, res, next) => {
  const inventory = new Inventory({
    ProductID: req.body.p_id,
    ProductName: req.body.p_name,
    Quantity: req.body.p_qty,
    ManufactureDate: req.body.m_date,
    ProductPrice: req.body.p_price,
    Category: req.body.category,
  });
  try {
    await inventory.save();
    await res.redirect("/inventory");
  } catch (err) {
    if (err) throw new Error("Something is wrong");
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Inventory.findByIdAndDelete(id);
  res.redirect("/inventory");
});
module.exports = router;
