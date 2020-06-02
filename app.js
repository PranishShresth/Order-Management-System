// dependencies

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const flash = require("connect-flash");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const expressSession = require("express-session")({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: true,
    secure: false,
  },
});
require("dotenv").config();

//routes
const urlRoutes = require("./routes/index");
const orderRoutes = require("./routes/order");
const registrationRoutes = require("./routes/registration");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customer");
const ecommerceRoutes = require("./routes/e-commerce");
const paymentRoutes = require("./routes/payment");
const backupUtilRoutes = require("./routes/utils/backup");
const notificationRoutes = require("./routes/api/notification");
const productRoutes = require("./routes/api/products");
const cartRoutes = require("./routes/cart");
const invoiceRoutes = require("./routes/utils/invoice");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serving static files
app.use("/static", express.static("public"));

//view engine and layouts
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(expressSession);

//flash
app.use(flash());

//method override for put delete request
app.use(methodOverride("_method"));
//using Routes
app.use("/orders", orderRoutes);
app.use("/registration", registrationRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/customer", customerRoutes);
app.use("/ecommerce", ecommerceRoutes);
app.use("/", paymentRoutes);
app.use("/", backupUtilRoutes);
app.use("/", notificationRoutes);
app.use("/api", productRoutes);
app.use("/cart", cartRoutes);
app.use("/", invoiceRoutes);

//Database connection
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);
mongoose.set("useCreateIndex", true);

//urlRoutes
app.get("/demo", (req, res) => {
  res.render("demo", { layout: "layouts/registration-layout" });
});
app.use("/", urlRoutes);
app.get("/times", (req, res) => res.send(showTimes()));

showTimes = () => {
  let result = "";
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + " ";
  }
  return result;
};
//globalvariables
app.use(function (req, res, next) {
  res.locals.failure_msg = req.flash("failure");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
