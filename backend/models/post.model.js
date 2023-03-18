const mongoose = require("mongoose");
const User = require("./user.model");

const PostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: "Post must have an owner",
    ref: "User",
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  users_like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  content: {
    body: {
      type: String,
      required: "Post must contain some body text",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
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

PostSchema.pre("remove", async function (next) {
  try {
    let user = await User.findOne({
      _id: this.userId.toString(),
    });
    await user.posts.remove(this.id);
    await user.save();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Post", PostSchema);
