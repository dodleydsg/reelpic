const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "A tag must have a name",
    unqiue: "Tag with the given name already exists",
    dropDups: true,
  },
  posts: {
    type: Array(mongoose.Types.ObjectId),
    default: [],
  },
});

module.exports = mongoose.model("Tag", TagSchema);
