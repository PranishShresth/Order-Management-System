const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");
const Notification = require("../models/notificationModel");
//search
router.get("/search", async (req, res) => {
  if (req.query.search) {
    const userRegex = new RegExp(req.query.search, "i");

    Customer.find({ CustomerName: userRegex }, function (err, customers) {
      if (err) {
        res.send("error");
      } else {
        res.render("partials/customer/viewCustomers", {
          title: "Edit customer",
          customers: customers,
          user: req.session.user,
        });
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

// add new Customer
router.post("/addCustomer", async (req, res) => {
  const customer = new Customer({
    CustomerName: req.body.custname,
    CustomerID: req.body.custid,
    CustPhone: req.body.phonenumber,
  });

  const newCustomer = await customer.save();
  const notification = new Notification({
    eventName: req.body.custname,
    eventType: "added",
  });
  await notification.save();
  res.redirect("/customer/ViewCustomers");
});
module.exports = router;

//get one customer
router.get("/api/:customerid", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.customerid);
    res.render("partials/customer/editCustomer", {
      title: "Edit customer",
      customer: customer,
      user: req.session.user,
    });
  } catch (err) {
    if (err) throw err;
  }
});

//update a customer

router.put("/api/:customerid", async (req, res, next) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.customerid);
    customer.CustomerName = req.body.custname;
    customer.CustPhone = req.body.phonenumber;
    await customer.save();
    const notification = new Notification({
      eventName: req.body.custname,
      eventType: "Updated",
    });
    await notification.save();
    res.redirect("/customer/viewCustomers");
  } catch {
    if (customer === null) {
      res.send("Cannot find such customer");
    }
  }
});

//detete a customer by id

router.delete("/api/:customerid", async (req, res, next) => {
  let customer;
  try {
    customer = Customer.findOneAndDelete(
      { _id: req.params.customerid },
      (err) => {
        if (!err) {
          return res.redirect("/customer/viewCustomers");
        }
      }
    );
  } catch (err) {
    if (err) return res.status(401).send("Delete request failed");
  }
});
