const Notification = require("../models/notification.model");
const errorHandler = require("../helpers/dbErrorHandler");

const notify = async (user, description) => {
  try {
    let notification = await new Notification({ user, description });
    await notification.save();
  } catch (error) {
    return errorHandler.getErrorMessage(error);
  }
};

module.exports = notify;
