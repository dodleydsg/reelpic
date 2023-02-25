import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  // Id for the post containing the comment
  postId: String,
  body: String,
  replies: [{ type: String, default: null }],
  created: {
    type: Date,
    default: Date.now,
  },
  likes: Number,
});

export default mongoose.model("Comment", CommentSchema);
