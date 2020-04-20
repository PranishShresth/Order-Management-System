// dependencies

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
//routes
const urlRoutes = require("./routes/urlRoutes");
const orderRoutes = require("./routes/order");
const registrationRoutes = require("./routes/registration");

//passport config
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.use("/orders", orderRoutes);
app.use("/registration", registrationRoutes);

//Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);
//urlRoutes

app.use("/", urlRoutes);
//creating a server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
