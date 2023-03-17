const Post = require("../models/post.model"),
  errorHandler = require("../helpers/dbErrorHandler"),
  extend = require("lodash"),
  Redis = require("ioredis");
let LIKE_REQUESTS = 0;

const redisClient = new Redis();

const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      return res.status(403).json({
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
    return res.status(404).json({
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
    return res.status(404).json({
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
    return res.status(404).json({
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
    return res.status(404).json({
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
    return res.status(404).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const like = async (req, res, next) => {
  try {
    if (LIKE_REQUESTS > 3) {
      console.log("Slow");
      // If threshold for just Redis updates is reached, pull the Post object from MongoDB and likes and update the post.likes property
      let post = await Post.findById(req.params.postId);
      let likes = parseInt(
        await redisClient.get(`post:${req.params.postId}:likes`)
      );

      // update with values from redis
      post.likes += likes;
      // update with respect to action
      req.params.action.toLowerCase() === "like" ? post.likes++ : post.likes--;

      // now update Redis database with correct value, due to downtime while processesing previous actions
      await redisClient.decrby(`post:${req.params.postId}:likes`, likes);
      LIKE_REQUESTS = 0;
      await post.save();
    } else {
      // If threshold not exceeded continue to update likes just on the Redis Database
      console.log("Fast");
      LIKE_REQUESTS++;
      if (req.params.action.toLowerCase() === "like") {
        await redisClient.incr(`post:${req.params.postId}:likes`);
      } else {
        await redisClient.decr(`post:${req.params.postId}:likes`);
      }
    }

    if (req.params.action.toLowerCase() === "like") {
      return res.status(200).json({
        action: "Like",
      });
    }
    return res.status(200).json({
      action: "Dislike",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Couldn't complete request",
    });
  }
};

module.exports = {
  create,
  remove,
  returnPost,
  trash,
  list,
  update,
  like,
};
