const mongoose = require("mongoose");
const User = require("./user.model");

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: "Post must have an Author",
    ref: "User",
  },

  created: {
    type: Date,
    default: Date.now,
  },
  usersLike: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  tags: [{ type: String, ref: "Tag" }],
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  content: {
    body: {
      type: String,
      required: "Post must contain some body text",
    },
    commentCount: {
      type: Number,
      default: 0,
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
