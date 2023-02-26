import mongoose from "mongoose";

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
  items: [String],
});

export default mongoose.model("Catalogue", CatalogueSchema);
