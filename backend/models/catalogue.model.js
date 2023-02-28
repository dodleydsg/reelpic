import mongoose from "mongoose";
import User from "./user.model.js";

const CatalogueSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: "A catalogue must have a user",
  },
  title: {
    type: String,
    required: "Catalogue must have a title",
  },
  description: String,
  items: [String],
});

CatalogueSchema.pre("remove", async function (next) {
  console.log(this);
  try {
    let user = await User.findOne({
      _id: this.userId.toString(),
    });
    console.log(this._id.toString());
    await user.catalogues.remove(this.id);
    user.save();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Catalogue", CatalogueSchema);
