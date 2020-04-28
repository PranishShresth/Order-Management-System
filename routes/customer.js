const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");

//search
router.get("/search", async (req, res) => {
  if (req.query.search) {
    const userRegex = new RegExp(req.query.search, "i");

    Customer.find({ CustomerName: userRegex }, function (err, customers) {
      if (err) {
        res.send("error");
      } else {
        res.render("partials/viewCustomers", { customers: customers });
      }
    });
  }
});

//get all customers
router.get("/api/viewCustomers", async (req, res) => {
  const customers = await Customer.find({});
  res.status(201).json(customers);
});

// get addCustomer page
router.get("/addCustomers", (req, res) => {
  res.render("partials/addCustomer");
});

// add new Customer
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
