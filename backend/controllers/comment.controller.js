import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    let post = await Post.findOne({
      _id: req.body.postId,
    });
    post.content.comments.push(comment._id);
    await post.save();
    await comment.save();
    return res.status(200).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const list = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    await Comment.find({
      post: req.params.commentId,
    }).remove();
    return res.status(200).json({
      message: "Successfully removed post",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const like = async (req, res, next) => {};

const reply = async (req, res, next) => {
  try {
  } catch (error) {}
};

export default { create, remove, like, list };
