const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const Notification = require("./../models/notificationModel");

//Getting all orders

router.get("/api/viewOrder", async (req, res) => {
  const orders = await Order.find({});
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
    type: req.body.type,
    description: req.body.description,
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
    res.redirect("dashboard");
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

    res.render("partials/order/editOrder", {
      title: "Edit order",
      order: order,
    });
  } catch {
    res.redirect("/orders/viewOrder");
  }
});

//Edit or update the error
router.put("/api/:orderid", async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.orderid);

    order.name = req.body.name;
    order.type = req.body.type;
    order.description = req.body.description;
    order.customer = req.body.customer;
    order.status = req.body.status;
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
    sendmail(custname, oemail);
    res.redirect("/orders/viewOrder");
  } catch (err) {
    if (err) throw new Error("Error for details");
  }
});
//export module
const sendmail = (username, email) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ordermanagementsystem2@gmail.com", // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var output = `
  <p>Thank you for ordering with Revenant Dawn - Order Management System<p>
  <p>Your order has been confirmed. When it ships, we will let you know<p>
  <br>
  <footer>
  <p>Kind Regards,<p>
  <p>Revenant Dawn Team</p>
  <p>Sydney, NSW</p
  </footer>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Order Management System" <ordermanagementsystem2@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "User registration", // Subject line
    text: "Successful registration", // plain text body
    html: `<p>Dear ${username},<p><br>` + output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
module.exports = router;
