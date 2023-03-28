const mongoose = require("mongoose");


const NotificationSchema = new mongoose.Schema({
  user: {
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

NotificationSchema.post("create", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.notifications.push(this._id);
    await user.save();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
