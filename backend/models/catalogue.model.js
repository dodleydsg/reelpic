import mongoose from "mongoose";

const CatalogueSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Catalogue must have a title",
  },
  items: [String],
});

export default mongoose.model("Catalogue", CatalogueSchema);
