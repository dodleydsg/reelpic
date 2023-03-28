const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  description: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(NotificationSchema);
