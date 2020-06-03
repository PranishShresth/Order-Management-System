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
  },
  ManufactureDate: {
    type: String,
  },
  ProductPrice: {
    type: Number,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
