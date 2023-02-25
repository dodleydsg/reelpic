import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  owner: {
    type: String,
    required: "Post must have an owner",
  },
  likes: Number,
  users_like: [String],
  content: {
    body: {
      type: String,
      required: "Post must contain some body text",
    },
    comments: [
      {
        type: String,
        default: null,
      },
    ],
    images: [
      {
        type: String,
        default: null,
      },
    ],
  },
  trash: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Post", PostSchema);
