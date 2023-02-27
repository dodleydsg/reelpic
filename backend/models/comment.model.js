import mongoose, { Mongoose } from "mongoose";
import Post from "./post.model.js";

const CommentSchema = mongoose.Schema({
  // Id for the post containing the comment
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: "Comment must have a postId",
  },
  body: {
    type: String,
    required: "Comment must have a body",
  },
  replies: [{ type: mongoose.Types.ObjectId, default: null, ref: "Comment" }],
  created: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

CommentSchema.pre("remove", async (next) => {
  try {
    let post = await Post.findById(this.postId);
    await post.content.comments.remove(this.id);
  } catch (error) {
    console.log("Here");
    next(error);
  }
});

export default mongoose.model("Comment", CommentSchema);
