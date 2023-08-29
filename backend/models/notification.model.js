const mongoose = require("mongoose");


const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  linkedTo: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  description: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
