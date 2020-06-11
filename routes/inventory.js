const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventoryModel");

router.get("/inventoryDetails", async (req, res, next) => {
  const inventory = await Inventory.find();
  res.json(inventory);
});

router.get("/inventoryCategory", async (req, res, next) => {
  const inventory = await Inventory.aggregate([
    {
      $group: {
        _id: "$Category",
        Quantity: { $sum: "$Quantity" },
      },
    },
  ]);
  res.json(inventory);
});
router.post("/addInventory", async (req, res, next) => {
  const inventory = new Inventory({
    ProductID: req.body.p_id,
    ProductName: req.body.p_name.trim(),
    Quantity: req.body.p_qty,
    ManufactureDate: req.body.m_date,
    ProductPrice: req.body.p_price.trim(),
    Category: req.body.category.trim(),
  });
  try {
    await inventory.save();
    await res.redirect("/inventory");
  } catch (err) {
    if (err) throw new Error("Something is wrong");
  }
});

router.post("/editInventory", async (req, res, next) => {
  const { p_name, p_id, category, p_qty, p_price, m_date } = req.body;
  let product;
  try {
    product = await Inventory.findOne({ ProductID: p_id });
    product.ProductName = p_name;
    product.Quantity = p_qty;
    product.ProductPrice = p_price;
    product.Category = category;
    product.ManufactureDate = m_date;
    await product.save();
    res.redirect("/inventory");
  } catch {
    if (product === null) {
      throw new Error("Product is null");
    }
  }
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Inventory.findByIdAndDelete(id);
  res.redirect("/inventory");
});
module.exports = router;
