import mongoose, { Mongoose } from "mongoose";

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

export default mongoose.model("Comment", CommentSchema);
