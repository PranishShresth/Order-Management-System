const mongoose = require("mongoose");

const watchitSchema = mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
});

const watchitModel = mongoose.model("Watch", watchitSchema);
module.exports = watchitModel;
