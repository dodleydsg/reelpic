import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  user: ObjectId,
  body: String,
  replies: [{ type: ObjectId, default: null }],
  created: {
    type: Date,
    default: Date.now,
  },
  likes: Number,
});

export default mongoose.Model("Comment", CommentSchema);
