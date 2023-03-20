const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const errorHandler = require("../helpers/dbErrorHandler");
const extend = require("lodash");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const create = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    let post = await Post.findById(req.body.postId.toString());
    post.content.comments.push(comment._id);
    await post.save();
    await comment.save();
    return res.status(200).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const list = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    });
    return res.status(200).json(comments);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const remove = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    await comment.remove();
    return res.status(200).json({
      message: `Successfully removed comment ${comment._id}`,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const like = async (req, res, next) => {};

const reply = async (req, res, next) => {
  try {
    let reply = new Comment(req.body);
    let root = await Comment.findById(req.body.commentId);
    root.replies.push(reply._id);
    await root.save();
    await reply.save();
    return res.status(200).json({
      message: "Replied successfully",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const update = async (req, res, next) => {
  try {
    let comment = await Comment.findOne({
      _id: req.params.commentId,
    });
    comment = extend(comment, req.body);
    await comment.save();
    return res.status(200).json({
      message: "Comment updated",
      comment,
    });
  } catch (error) {
    genericErrorBlock(error);
  }
};

module.exports = { create, remove, like, list, reply, update };
