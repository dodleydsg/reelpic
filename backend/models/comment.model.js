import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  // Id for the post containing the comment
  postId: {
    type: String,
    required: "Comment must have a postId",
  },
  body: {
    type: String,
    required: "Comment must have a body",
  },
  replies: [{ type: String, default: null }],
  created: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Comment", CommentSchema);
