const mongoose = require("mongoose");
const User = require("./user.model");
const Notification = require("./notification.model");
const notify = require("../helpers/notify");

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

CatalogueSchema.methods = {
  toString: function (action) {
    return `${action} catalogue with title ${this.title}`;
  },
};

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

CatalogueSchema.post("update", async function (next) {
  let description = this.toString("Updated");
  notify(description, next);
});

CatalogueSchema.post("remove", async function (next) {
  let description = this.toString("Deleted");
  notify(description, next);
});




module.exports = mongoose.model("Catalogue", CatalogueSchema);
