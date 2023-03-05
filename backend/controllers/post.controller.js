import Post from "../models/post.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import extend from "lodash/extend.js";
import mongoose from "mongoose";

const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      return res.status(400).json({
        message: "Unauthorized user",
      });
    }
    let post = new Post(req.body);
    user.posts.push(post._id);
    await post.save();
    await user.save();
    return res.status(200).json({
      message: "Post added",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const list = async (req, res, next) => {
  try {
    const posts = req.profile.posts;
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const trash = async (req, res, next) => {
  try {
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    post.trash = true;
    await post.save();
    return res.status(200).json({
      message: "Message sent to trash",
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    await post.remove();
    return res.status(200).json({
      message: "Post successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const returnPost = async (req, res, next) => {
  try {
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    post.trash = false;
    await post.save();
    return res.status(200).json({
      message: "Post returned to inbox",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const update = async (req, res, next) => {
  try {
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    post = extend(post, req.body);
    await post.save();
    return res.status(200).json({
      message: "Post updated",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const getLikes = async (req, res, next) => {};
const setLikes = async (req, res, next) => {};

export default {
  create,
  remove,
  returnPost,
  trash,
  list,
  update,
  getLikes,
  setLikes,
};
