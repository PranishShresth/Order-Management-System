const mongoose = require("mongoose");

const categoryModel = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categoryModel);

module.exports = Category;
