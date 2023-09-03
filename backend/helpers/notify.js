const Notification = require("../models/notification.model");
const errorHandler = require("../helpers/dbErrorHandler");

const notify = async (user, linkedTo, description) => {
  try {
    const userId = user._id;
    let notification = new Notification({ userId, description, linkedTo });
    await notification.save();
    user.notifications.push(notification._id);
    // console.log(user);
    await user.save();
  } catch (error) {
    return errorHandler.getErrorMessage(error);
  }
};

module.exports = notify;
