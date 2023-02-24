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
        user: ObjectId,
        body: String,
        created: {
          type: Date,
          default: Date.now,
        },
        updated: Date,
        likes: Number,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
});

export default mongoose.Model("Post", PostSchema);
