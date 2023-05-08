const User = require("../models/user.model");
const extend = require("lodash");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const resetModes = require("../helpers/resetModes");

const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.cookies._id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.resetMode = resetModes.LOCKED;
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    user.resetMode = undefined;
    return res.status(200).json({
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const list = async (req, res, next) => {
  try {
    let users = await User.find().select("name email updated created");
    return res.json(users);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const read = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({
        message: "Couln't find user",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    user.resetMode = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const update = async (req, res, next) => {
  try {
    let user = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    let description = `You just updated your profile`;
    await notify(user._id, description);
    return res.status(200).json(user);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const follow = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() === req.params._id.toString()) {
      return res.json({
        message: "You can't follow yourself",
      });
    }
    let target = await User.findOne({ _id: req.params._id });
    if (!target) {
      genericErrorBlock(Error("Couldn't find user", res));
    }

    target.followers.addToSet(user._id.toString());
    user.following.addToSet(req.params._id);
    await user.save();
    await target.save();
    return res.json({
      message: "Followed successfully",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

module.exports = { create, read, list, remove, update, getUser, follow };
