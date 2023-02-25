import Post from "../models/post.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const addUserToCookie = (req, res, next) => {
  req.profile = { _id: req.cookies._id };
  next();
};

const create = async (req, res, next) => {
  console.log(req.cookie);
  let post = new Post(req.body);
  try {
    await post.save();
    return res.status(200).json({
      message: "Post added",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler(error),
    });
  }
};

const list = async (req, res, next) => {
  try {
    const posts = await Post.find({
      owner: req.params.user_id,
    }).select("name email updated created");
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const trash = async (req, res, next) => {
  try {
    let post = Post.findOne({
      _id: req.params.id,
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
    let post = req.params.id;
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
    let post = req.params.id;
    (post.trash = false), await post.save();
    return res.status(200).json({
      message: "Post returned to inbox",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const like = async (req, res, next) => {};

export default { addUserToCookie, create, remove, returnPost, trash, list };
