const Post = require("../models/post.model"),
  errorHandler = require("../helpers/dbErrorHandler"),
  { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors"),
  notify = require("../helpers/notify"),
  Tag = require("../models/tag.model"),
  User = require("../models/user.model"),
  _ = require("lodash");


const read = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId).populate(
      "user",
      "photo username"
    );
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
    let post = new Post(req.body);
    user.posts.push(post._id);
    user.feed.push(post._id);
    await post.save();
    await user.save();
    let description = `You created a new Post`;
    await notify(req.profile, req.profile._id, description);
    for (let i = 0; i < post.tags.length; i++) {
      let tag = await Tag.findOne({ name: post.tags[i] });
      if (!tag) {
        tag = new Tag({ name: post.tags[i] });
        await tag.save();
      }
      tag.posts.push(post._id);
      await tag.save();
    }

    return res.status(200).json(post);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const list = async (req, res, next) => {
  try {
    let posts = [];
    const postsList = req.profile.posts;
    for (let i = 0; i < postsList.length; i++) {
      let post = await Post.findById(postsList[i]);
      if (post) {
        posts.push(post);
      }
    }
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
    await notify(req.profile, req.profile._id, description);
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
    await notify(req.profile, req.profile._id, description);
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
    await notify(req.profile, req.profile._id, description);
    return res.status(200).json({
      message: "Post returned to inbox",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const feed = async (req, res, next) => {
  try {
    const interests = req.profile.interests;
    const seen = req.profile.seen || [];
    let feed = req.profile.feed;
    /* 
    Seen is an array of postIds, these postIds correspond to posts already viewed by the user
    This array has a max length of 200, cleaning the array is done in the post.read controller
    */

    let latestPost = _.last(req.profile.posts) || null;
    if (latestPost && !seen.includes(latestPost.toString())) {
      feed.addToSet(latestPost.toString());
    }

    // following stage
    const following = req.profile.following;
    let nFollowing = following.length - 1;
    let userCount = 0;
    while (nFollowing > -1 && count < 40) {
      const userFollowing = await User.findById(following[nFollowing]);
      let latestPost = _.last(userFollowing.posts) || null;
      if (latestPost && !seen.includes(latestPost.toString())) {
        feed.addToSet(latestPost.toString());
      }
      userCount++;
      nFollowing--;
    }

    // interest stage
    const tags = await Tag.find().where("name").in(interests).limit(10);
    for (let i = 0; i < tags.length; i++) {
      let latestPost = _.last(tags[i].posts) || null;
      if (latestPost && !seen.includes(latestPost.toString()))
        feed.addToSet(latestPost.toString());
    }

    if (feed > 100) {
      feed.splice(0, feed.length - 100);
    }

    let extra_feed = [];
    for (let i = feed.length - 1; i >= 0; i--) {
      let post = await Post.findById(feed[i])
        .populate("user", "username photo")
        .exec();
      if (post) {
        req.profile.seen.addToSet(post._id);
        extra_feed.push(post);
      }
    }
    await req.profile.save();
    return res.json(extra_feed);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const explore = async (req, res, next) => {
  // This return Post ids for usage in the explore section
  // May include start, stop keys for pagination
  try {
    const interests = req.profile.interests;
    const tags = await Tag.find().where("name").in(interests).limit(10);

    let count = tags.length; // counts backwards
    let posts = [];
    let used = [];
    while (posts < 100 && count > 0) {
      let searchIdx = _.random(0, count - 1);
      while (used.includes(searchIdx)) {
        searchIdx = _.random(0, count - 1);
      }

      posts.push(...tags[searchIdx].posts.slice(-25));
      count--;
    }
    req.profile.explore.addToSet(...posts);

    if (req.profile.explore.lenght > 100) {
      req.profile.explore = req.profile.explore.slice(req.profile.length - 100);
    }

    await req.profile.save();

    let extra_explore = [];
    for (let i = 0; i < req.profile.explore.length; i++) {
      let post = await Post.findById(req.profile.explore[i]).select(
        "_id content.images"
      );
      if (post) {
        extra_explore.push(post);
      }
    }
    return res.json(extra_explore);
  } catch (error) {
    genericErrorBlock(error, res);
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
    await notify(req.profile, req.profile._id, description);
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
    let post = await Post.findById(req.body.postId);
    if (!post) {
      return genericErrorBlock(error, res);
    }
    if (req.body.action.toLowerCase() === "like") {
      user.likes.addToSet(post._id);
      post.usersLike.addToSet(user._id);
      await user.save();
      await post.save();
      return res.status(200).json({
        action: "Like",
      });
    }
    user.likes.pull(post._id);
    post.usersLike.pull(user._id);
    await user.save();
    await post.save();
    return res.status(200).json({
      action: "Dislike",
    });
  } catch (error) {
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
