const Notification = require("../models/notification.model");
const errorHandler = require("../helpers/dbErrorHandler");

const notify = async (user, linkedTo, description) => {
  try {
    const userId = user._id;
    let notification = new Notification({ userId, description, linkedTo });
    await notification.save();
    await user.notifications.push(notification._id);
  } catch (error) {
    return errorHandler.getErrorMessage(error);
  }
};

module.exports = notify;
