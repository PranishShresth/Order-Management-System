const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
    min: [6, "Password must be atleast 6 character long"],
  },
  type: {
    type: String,
    default: "ServiceUser",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
