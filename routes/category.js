const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

router.get("/getCategory", async (req, res, next) => {
  const category = await Category.find();
  res.json(category);
});
router.post("/add", async (req, res, next) => {
  const { category } = req.body;
  const newCategory = new Category({
    categoryName: category,
  });
  try {
    await newCategory.save();
    res.redirect("/resource");
  } catch (err) {
    if (err) throw err;
  }
});

module.exports = router;
