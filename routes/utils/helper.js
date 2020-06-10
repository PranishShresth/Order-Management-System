const fetch = require("node-fetch");

module.exports = {
  getCustomer: async function () {
    const customerurl = process.env.SERVER + "customer/api/viewCustomers";
    let custresponse = await fetch(customerurl);
    let customers = await custresponse.json();
    return customers;
  },
  getInventory: async function () {
    const inventoryurl = process.env.SERVER + "inventory/inventoryDetails";
    let inventoryresponse = await fetch(inventoryurl);
    let inventory = await inventoryresponse.json();
    return inventory;
  },
  getProducts: async function () {
    const produrl = process.env.SERVER + "api/products";
    let prodresponse = await fetch(produrl);
    let products = await prodresponse.json();
    return products;
  },
  getNotifications: async function () {
    const response = await fetch(process.env.SERVER + "api/notification");
    const notifications = await response.json();
    const notification = await notifications
      .splice(notifications.length - 5)
      .reverse();
    return notification;
  },
  getCategory: async function () {
    const url = process.env.SERVER + "category/getCategory";
    let response = await fetch(url);
    let categories = await response.json();
    return categories;
  },

  getOrders: async function () {
    const url = process.env.SERVER + "orders/api/viewOrder";
    let response = await fetch(url);
    let orders = await response.json();
    return orders;
  },

  getUsers: async function () {
    const resp = await fetch(process.env.SERVER + "user");
    const users = await resp.json();
    return users;
  },
};
