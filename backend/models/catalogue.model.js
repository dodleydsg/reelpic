const mongoose = require("mongoose");
const User = require("./user.model");

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
  try {
    let user = await User.findOne({
      _id: this.userId.toString(),
    });
    await user.catalogues.remove(this.id);
    await user.save();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Catalogue", CatalogueSchema);
