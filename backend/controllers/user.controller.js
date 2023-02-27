import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully registered",
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};
const list = async (req, res, next) => {
  try {
    User.find()
      .select("name email updated created")
      .populate("posts_liked")
      .populate("catalogues")
      .populate("posts")
      .exec((err, users) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
          });
        }
        res.json(users);
      });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

const read = async (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
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
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

export default { create, read, list, remove, update };
