const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const csv = require("csv-express");

Router.get("/api/orders/backup", async (req, res, next) => {
  var filename = "products.csv";
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=" + filename);
  const url = "http://localhost:3010/orders/api/viewOrder";
  let response = await fetch(url);
  let orders = await response.json();
  res.csv(orders, true);
});

Router.get("/api/customers/backup", async (req, res, next) => {
  var filename = "orders.csv";
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=" + filename);
  const url = "http://localhost:3010/customer/api/viewCustomers";
  let response = await fetch(url);
  let customers = await response.json();
  res.csv(customers, true);
});

module.exports = Router;
