// dependencies

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const flash = require("connect-flash");

const expressLayouts = require("express-ejs-layouts");
const expressSession = require("express-session")({
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: true,
  },
});
//routes
const urlRoutes = require("./routes/urlRoutes");
const orderRoutes = require("./routes/order");
const registrationRoutes = require("./routes/registration");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customer");
const ecommerceRoutes = require("./routes/e-commerce");
const paymentRoutes = require("./routes/payment");

//passport config
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serving static files
app.use("/static", express.static("public"));

//view engine and layouts
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(expressSession);

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//using Routes
app.use("/orders", orderRoutes);
app.use("/registration", registrationRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/customer", customerRoutes);
app.use("/e-commerce", ecommerceRoutes);
app.use("/", paymentRoutes);

//Database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);
mongoose.set("useCreateIndex", true);

//urlRoutes

app.use("/", urlRoutes);

//globalvariables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
