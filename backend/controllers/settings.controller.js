const Setting = require("../models/settings.model"),
  { genericErrorBlock, unAuthorizedBlock } = require("./errors"),
  { extend } = require("lodash");

const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      unAuthorizedBlock();
    }
    let setting = new Setting(req.body);
    await setting.save();
    return res.status(200).json({
      message: "Created successfully",
      setting,
    });
  } catch (error) {
    genericErrorBlock(error);
  }
};

const update = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      unAuthorizedBlock();
    }
    let setting = await Setting.findById(req.body.id);
    extend(setting, req.body);
    await setting.save();
    return res.status(200).json({
      message: "Updated successffully",
      setting,
    });
  } catch (error) {
    genericErrorBlock(error);
  }
};

module.exports = { update, create };
