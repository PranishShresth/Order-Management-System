const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
    trim: true,
  },
  CustomerID: {
    type: Number,
    required: true,
  },
  CustPhone: {
    type: Number,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
