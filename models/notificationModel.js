const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  eventName: {
    type: String,
  },
  eventType: {
    type: String,
  },
  logged: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
