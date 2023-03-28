const Notification = require("../models/notification.model");

const notify = async (description, next) => {
  try {
    let notification = await new Notification({ description });
    await notification.save();
  } catch (error) {
    next(error);
  }
};

module.exports = notify;
