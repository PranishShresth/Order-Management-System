const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema({
  ProductID: {
    type: String,
  },
  ProductName: {
    type: String,
    trim: true,
  },
  Quantity: {
    type: Number,
    trim: true,
  },
  ManufactureDate: {
    type: String,
  },
  Category: {
    type: String,
    trim: true,
  },
  ProductPrice: {
    type: Number,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
