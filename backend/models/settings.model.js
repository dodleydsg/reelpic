const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  language: {
    type: String,
    default: "en",
  },
  theme: {
    type: String,
    default: "light",
  },
  dataSaving: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Model", SettingSchema);
