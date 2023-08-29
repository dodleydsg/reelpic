const Notification = require("../models/notification.model");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");

const read = async (req, res) => {
  try {
    const alert = await Notification.findById(req.params.alertId);
    if (!alert) {
      res.status(404).json({ message: "Alert not found" });
    }
    return res.json(alert);
  } catch (error) {
    return genericErrorBlock(res);
  }
};
const list = async (req, res) => {
  try {
    let alerts = await Notification.find()
      .where("_id")
      .in(req.profile.notifications)
      .populate("linkedTo", "photo");
    if (req.profile.notifications && !alerts) {
      return res
        .status(404)
        .json({ message: "Couldn't get notifications from selected ids" });
    }
    return res.json(alerts);
  } catch (error) {
    return genericErrorBlock(res);
  }
};

module.exports = { list, read };
