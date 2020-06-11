const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");

const Notification = require("./../models/notificationModel");

//Getting all orders

router.get("/api/viewOrder", async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

router.get("/api/orderLine", async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(orders);
});

//Searching order
router.get("/search", async (req, res) => {
  if (req.query.search) {
    const userRegex = new RegExp(req.query.search, "i");

    Order.find({ name: userRegex }, function (err, orders) {
      if (err) {
        res.send("error");
      } else {
        res.render("partials/order/vieworder", {
          title: "Edit order",
          orders: orders,
          user: req.session.user,
        });
      }
    });
  }
});

//
router.post("/", async (req, res) => {
  const order = new Order({
    id: uuidv4(),
    name: req.body.name,
    productName: req.body.pname,
    status: req.body.status,
    price: req.body.price,
    customer: req.body.customer,
    totalAmount: req.body.amount,
  });
  try {
    const newOrder = await order.save();
    const notification = new Notification({
      eventName: req.body.name,
      eventType: "Added",
    });
    await notification.save();
    res.redirect("/orders/vieworder");
  } catch (err) {
    if (err) throw err;
    res.status(500).json({
      message: err.message,
    });
  }
});

//get one order

router.get("/api/:orderid", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderid);
    const customerurl = process.env.SERVER + "customer/api/viewCustomers";
    let custresponse = await fetch(customerurl);
    let customers = await custresponse.json();
    //product
    const url = process.env.SERVER + "inventory/inventoryDetails";
    let response = await fetch(url);
    let products = await response.json();

    res.render("partials/order/editOrder", {
      title: "Edit order",
      order: order,
      customers: customers,
      products: products,
      user: req.session.user,
    });
  } catch (err) {
    if (err) throw err;
    res.redirect("/orders/viewOrder");
  }
});

//Edit or update the error
router.put("/api/:orderid", async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.orderid);
    order.name = req.body.name.trim();
    order.productName = req.body.pname.trim();
    order.customer = req.body.customer.trim();
    order.status = req.body.status.trim();
    order.price = req.body.price;
    order.totalAmount = req.body.amount;
    await order.save();
    const notification = new Notification({
      eventName: req.body.name,
      eventType: "Added",
    });
    await notification.save();
    res.redirect("/orders/viewOrder");
  } catch {
    if (order === null) {
      res.redirect("/dashboard");
    }
  }
});

//Delete order

router.delete("/api/:orderid", async (req, res, next) => {
  let order;
  try {
    order = Order.findOneAndDelete({ _id: req.params.orderid }, (err) => {
      if (!err) res.redirect("/orders/viewOrder");
    });
  } catch (err) {
    if (err) throw err;
  }
});

//order details
router.post("/approve", async (req, res) => {
  const oemail = req.body.oemail;
  const custname = req.body.custname;
  try {
    await sendEmail(oemail);
    res.redirect("/orders/viewOrder");
  } catch (err) {
    if (err) throw new Error("Error for details");
  }
});

//export module
const sendEmail = (touser) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: touser,
    from: "ordermanagementsystem2@gmail.com",
    subject: "Confirming your order",
    html: `
    <p>Thank you for ordering with Revenant Dawn - Order Management System<p>
  <p>Your order has been confirmed. When it ships, we will let you know<p>
  <br>
  <footer>
  <p>Kind Regards,<p>
  <p>Revenant Dawn Team</p>
  <p>Sydney, NSW</p
  </footer></p>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.log(error.response.body);
      // console.log(error.response.body.errors[0].message)
    });
};
module.exports = router;
