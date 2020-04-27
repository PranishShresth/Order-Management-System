const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");

router.get("/addCustomers", (req, res) => {
  res.render("partials/addCustomer");
});

router.post("/addCustomer", async (req, res) => {
  const customer = new Customer({
    CustomerName: req.body.custname,
    CustomerID: req.body.custid,
    CustPhone: req.body.phonenumber,
  });

  const newCustomer = await customer.save();
  res.status(201).send("<h1> Customer Added to the Database </h1>");
});
module.exports = router;
