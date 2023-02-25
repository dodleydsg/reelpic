import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now,
  },
  users_like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Image", ImageSchema);
