const Post = require("../models/post.model"),
  errorHandler = require("../helpers/dbErrorHandler"),
  extend = require("lodash"),
  Redis = require("ioredis"),
  { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");

let LIKE_REQUESTS = 0;

const redisClient = new Redis();

const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      unAuthorizedErrorBlock(res);
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
    genericErrorBlock(error, res);
  }
};

const list = async (req, res, next) => {
  try {
    const posts = req.profile.posts;
    return res.status(200).json(posts);
  } catch (error) {
    genericErrorBlock(error, res);
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
      message: "Post sent to trash",
    });
  } catch (error) {
    genericErrorBlock(error, res);
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
    genericErrorBlock(error, res);
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
    genericErrorBlock(error, res);
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
    genericErrorBlock(error, res);
  }
};

const like = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      unAuthorizedErrorBlock(res);
    }
    if (LIKE_REQUESTS > 3) {
      // If threshold for just Redis updates is reached, pull the Post object from MongoDB and likes and update the post.likes property
      console.log("slow");
      let post = await Post.findById(req.body.postId);
      let likes = parseInt(
        await redisClient.get(`post:${req.body.postId}:likes`)
      );
      let users_like = await redisClient.smembers(
        `post:${req.body.postId}:users_like`
      );

      // update with values from redis
      post.likes += likes;
      users_like || post.users_like.addToSet(users_like);
      // update with respect to action
      if (req.body.action.toLowerCase() === "like") {
        post.likes++;
        post.users_like.addToSet(req.body.userId);
      } else {
        post.likes > 0 ? post.likes-- : null;
        post.users_like.pull(req.body.userId);
      }
      await post.save();

      // update with respect to action

      // now update Redis database with correct value, due to downtime while processesing previous actions
      await redisClient.decrby(`post:${req.body.postId}:likes`, likes);
      users_like ||
        (await redisClient.srem(
          `post:${req.body.postId}:users_like`,
          users_like
        ));

      LIKE_REQUESTS = 0;
    } else {
      // If threshold not exceeded continue to update likes just on the Redis Database
      console.log("Fast");
      LIKE_REQUESTS++;
      if (req.body.action.toLowerCase() === "like") {
        await redisClient.incr(`post:${req.body.postId}:likes`);

        await redisClient.sadd(
          `post:${req.body.postId}:users_like`,
          req.body.userId
        );
      } else {
        await redisClient.decr(`post:${req.body.postId}:likes`);
        await redisClient.srem(
          `post:${req.body.postId}:users_like`,
          req.body.userId
        );
      }
    }

    if (req.body.action.toLowerCase() === "like") {
      return res.status(200).json({
        action: "Like",
      });
    }
    return res.status(200).json({
      action: "Dislike",
    });
  } catch (error) {
    console.log(error);
    genericErrorBlock(error, res);
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
