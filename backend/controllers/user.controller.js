const User = require("../models/user.model");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const resetModes = require("../helpers/resetModes");
const notify = require("../helpers/notify");
const _ = require("lodash");

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
    let description = `You successfully created your profile`;
    await notify(user, user._id, description);
    return res.status(200).json({
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    let user = req.profile;
    const { oldPassword, newPassword } = req.body;
    if (!user.authenticate(oldPassword)) {
      return res.status(401).json({ message: "Old password doesn't match" });
    }
    user.password = newPassword;
    await user.save();
    notify(user, user._id,  "Successfully updated your password")
    return res.status(200).json({ message: "Changed password successfully" });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const hybridRead = async (req, res, next) => {
  try {
    const { username, populate } = req.body;
    let user;
    // const SAMPLE_REQUEST = {
    //   username: 'malina',
    //   populate: {
    //     field: 'posts',
    //     subFields: ['images', '_id']
    //   }
    // }
    if (populate.length > 0) {
      let popArray = [];
      for (let i = 0; i < populate.length; i++) {
        let obj = {};
        obj.path = populate[i].field;
        let select = _.join(populate[i].subFields, " ");
        obj.select = select;
        popArray.push(obj);
      }
      user = await User.findOne({ username }).populate(popArray);
    } else {
      user = await User.findOne({ username });
    }
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
    let { username, bio, interests, photo } = req.body;
    let user = await User.findOneAndUpdate(
      { email: req.profile.email },
      { username, bio, interests, photo },
      {
        new: true,
      }
    );
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
    const {action, target, _id} = req.body
    if (user._id.toString() === target.toString()) {
      return res.json({
        message: "You can't follow yourself",
      });
    }
    let targetUser = await User.findOne({ _id: target });
    if (!target) {
      genericErrorBlock(Error("Couldn't find user", res));
    }
    if(action.toLowerCase().trim() === 'follow'){
      targetUser.followers.addToSet(user._id.toString());
      user.following.addToSet(target);
      let description = `You followed ${targetUser.username}`;
      await notify(req.profile, req.profile._id, description);
      description = `${user.username} followed you`
      await notify(targetUser, targetUser._id, description)
    }else{
      targetUser.followers.pull(user._id.toString());
      user.following.pull(target)
      let description = `You unfollowed ${targetUser.username}`;
      await notify(req.profile, req.profile._id, description);
      description = `${user.username} unfollowed you`
      await notify(targetUser, targetUser._id, description)
    }
    await user.save();
    await targetUser.save();

    return res.json({
      message: action.toLowerCase().trim() === 'follow'? "Followed successfully" : "Unfollowed successfully",
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
  hybridRead,
  updatePassword,
};
