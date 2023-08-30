const User = require("../models/user.model");
const extend = require("lodash");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const resetModes = require("../helpers/resetModes");
const notify = require("../helpers/notify");

const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.auth._id);
    if (!user) {
      next();
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
        message: "Couldn't find user",
      });
    }
    user.resetMode = undefined;
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    user.resetMode = undefined;
    return res.status(200).json(user);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const altRead = async (req, res, next) => {
  try {
    let user = req.profile;
    if (!user) {
      return res.status(404).json({
        message: "Couldn't find user",
      });
    }
    user.resetMode = undefined;
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    user.resetMode = undefined;
    return res.status(200).json(user);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const update = async (req, res, next) => {
  try {
    let user =
      (await User.findOneAndUpdate(
        { email: req.body.email },
        { ...req.body, email: undefined },
        { new: true }
      )) ||
      (await User.findOneAndUpdate(
        { username: req.params.username },
        { ...req.body, email: undefined },
        { new: true }
      ));
    if (!user) {
      return res.status(404).json({
        message: "Couldn't find user",
      });
    }

    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    let description = `You successfully updated your profile`;
    await notify(req.profile, req.profile._id, description);
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
    if (user._id.toString() === req.params.followId.toString()) {
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
    let description = `You followed ${target.username}`;
    await notify(req.profile, req.profile._id, description);

    description = `${req.profile.username} follows you`;
    await notify(target, req.profile._id, description);

    return res.json({
      message: "Followed successfully",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

module.exports = {
  create,
  read,
  list,
  remove,
  update,
  altRead,
  getUser,
  follow,
};
