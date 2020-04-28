const express = require("express");
const Router = express.Router();

Router.get("/payment", (req, res) => {
  res.render("payment");
});

module.exports = Router;
