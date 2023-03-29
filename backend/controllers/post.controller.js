const Post = require("../models/post.model"),
  errorHandler = require("../helpers/dbErrorHandler"),
  Redis = require("ioredis"),
  { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors"),
  notify = require("../helpers/notify"),
  Tag = require("../models/tag.model"),
  User = require("../models/user.model");

let LIKE_REQUESTS = 0;

const redisClient = new Redis();

const read = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "Could'nt find post",
      });
    }
    return res.status(200).json(post);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      unAuthorizedErrorBlock(res);
    }
    let post = new Post(req.body);
    user.posts.push(post._id);
    user.feed.push(post._id);
    await post.save();
    await user.save();
    let description = `You added a post`;
    await notify(user._id, description);
    for (let i = 0; i < post.tags.length; i++) {
      let tag = await Tag.findOne({ name: post.tags[i] });
      console.log(tag);
      if (!tag) {
        tag = new Tag({ name: post.tags[i] });
        await tag.save();
      }
      tag.posts.push(post._id);
      await tag.save();
    }

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
    let user = req.profile;
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    post.trash = true;
    user.posts.pop(post._id.toString());
    await post.save();
    await user.save();
    let description = `You trashed a post`;
    notify(user._id, description);
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
    let description = `You deleted a post`;
    notify(user._id, description);
    return res.status(200).json({
      message: "Post successfully deleted",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const returnPost = async (req, res, next) => {
  try {
    let user = req.profile;
    let post = await Post.findOne({
      _id: req.params.postId,
    });
    user.posts.addToSet(post._id);
    post.trash = false;
    await user.save();
    await post.save();
    let description = `You retrieved a post`;
    await notify(user._id, description);
    return res.status(200).json({
      message: "Post returned to inbox",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const feed = async (req, res, next) => {
  // Returns an array of updated feed items
  try {
    // update variable carries new feed items for update in the frontend
    let update = [];

    // oldfeed contains all old posts, this is returned in the body of the request from the frontend
    let oldFeed = req.body.oldFeed;

    // gets the user's latest post, to be included in the feed
    let latestPost = req.profile.posts.slice(-1).toString() || null;
    if (!oldFeed.includes(latestPost)) update.push(latestPost);
    if (req.profile.following.length > 0) {
      for (let i = 0; i < req.profile.following.length; i++) {
        let user = await User.findOne({ _id: req.profile.following[i] });
        if (oldFeed.includes(user.posts.slice(-1).toString())) {
          continue;
        } else {
          update.push(user.posts.slice(-1));
        }
      }
    }

    return res.status(200).json({
      update,
    });
  } catch (error) {
    genericErrorBlock(error);
  }
};

const explore = async (req, res, next) => {
  // This return Post ids for usage in the explore section
  // May include start, stop keys for pagination
  try {
    let tags = req.profile.interests;
    let posts = [];

    for (let i = 0; i < tags.length; i++) {
      let tag = await Tag.findOne({ name: tags[i] });
      if (!tag) {
        continue;
      }
      console.log(tags[i]);
      posts = posts.concat(tag.posts);
    }

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    genericErrorBlock(error);
  }
};

const update = async (req, res, next) => {
  try {
    let post = await Post.findOneAndUpdate(
      {
        _id: req.params.postId,
      },
      req.body,
      { new: true }
    );
    await post.save();
    let description = `You updated a post`;
    await notify(user._id, description);
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

      // update with values from redis
      post.likes += likes;
      // update with respect to action
      if (req.body.action.toLowerCase() === "like") {
        post.likes++;
      } else {
        post.likes > 0 ? post.likes-- : null;
      }
      await post.save();

      // update with respect to action

      // now update Redis database with correct value, due to downtime while processesing previous actions
      await redisClient.decrby(`post:${req.body.postId}:likes`, likes);

      LIKE_REQUESTS = 0;
    } else {
      // If threshold not exceeded continue to update likes just on the Redis Database
      console.log("Fast");
      LIKE_REQUESTS++;
      if (req.body.action.toLowerCase() === "like") {
        await redisClient.incr(`post:${req.body.postId}:likes`);
      } else {
        await redisClient.decr(`post:${req.body.postId}:likes`);
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
  read,
  feed,
  explore,
};
