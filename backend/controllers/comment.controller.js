const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const create = async (req, res, next) => {
  try {
    const comment = new Comment({ ...req.body, author: req.profile._id });
    let post = await Post.findById(req.body.postId.toString());
    post.content.comments.push(comment._id);
    post.content.commentCount++;
    await post.save();
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const read = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Couldn't find comment",
      });
    }
    return res.status(200).json({
      comment,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const list = () => {};

const listIds = async (req, res, next) => {
  try {
    const post = await Post.findById(req.query.postId);
    return res.status(200).json(post.content.comments);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const detail = async (req, res, next) => {
  try {
    const posts = await Comment.find()
      .where("_id")
      .in(req.body.ids)
      .populate("author", "username photo");
    return res.status(200).json(posts);
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
    let comment = await Comment.findOneAndUpdate(
      {
        _id: req.params.commentId,
      },
      req.body,
      { new: true }
    );
    await comment.save();
    return res.status(200).json({
      message: "Comment updated",
      comment,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

module.exports = {
  create,
  remove,
  like,
  list,
  listIds,
  reply,
  update,
  read,
  detail,
};
