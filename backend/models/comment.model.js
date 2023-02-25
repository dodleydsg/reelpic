import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  post: String,
  body: String,
  replies: [{ type: String, default: null }],
  created: {
    type: Date,
    default: Date.now,
  },
  likes: Number,
});

export default mongoose.model("Comment", CommentSchema);
