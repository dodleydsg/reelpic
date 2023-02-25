import Comment from "../models/comment.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res, next) => {
  try {
    const commment = new Comment(req.body);
    await commment.save();
    return res.status(200).json({
      message: "Comment added successfully",
      commment,
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

export default { create, remove, like, list };
