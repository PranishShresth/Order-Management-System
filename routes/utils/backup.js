const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const csv = require("csv-express");
const { getInventory, getCustomer, getOrders } = require("./helper");

Router.get("/api/orders/backup", async (req, res, next) => {
  var filename = "orders.csv";
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=" + filename);

  let orders = await getOrders();
  res.csv(orders, true);
});

Router.get("/api/customers/backup", async (req, res, next) => {
  var filename = "customers.csv";
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=" + filename);

  let customers = await getCustomer();
  res.csv(customers, true);
});

Router.get("/api/inventory/backup", async (req, res, next) => {
  var filename = "inventory.csv";
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=" + filename);
  let inventory = await getInventory();
  res.csv(inventory, true);
});
module.exports = Router;
