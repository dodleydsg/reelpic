import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId },
  title: String,
  users_like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  content: {
    body: String,
    comments: [
      {
        type: ObjectId,
        default: null,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  trash: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.Model("Post", PostSchema);
