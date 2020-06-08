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
    required: true,
    min: [6, "Password must be atleast 6 character long"],
  },
  phone: {
    type: Number,
    default: "123456789",
  },
  bio: {
    type: String,
    default: "I am new user",
  },
  type: {
    type: String,
    default: "ServiceUser",
  },
});
userSchema.index({ "$**": "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
