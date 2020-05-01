const express = require("express");
const router = express.Router();
const Notification = require("../../models/notificationModel");

router.get("/api/notification", async (req, res, next) => {
  const notifications = await Notification.find({});
  res.status(201).json(notifications);
});

module.exports = router;
