const mongoose = require("mongoose");
const { createHmac } = require("node:crypto");
const resetModes = require("../helpers/resetModes");
const provider = require("../helpers/authProvider");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  email: {
    type: String,
    trim: true,
    unique: "This email already exists",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
    required: "Email is required",
    dropDups: "Email already exists",
  },
  feed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  explore: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  bio: String,
  username: {
    type: String,
    trim: true,
    unique: "This username is already taken",
    default: "",
  },
  interests: [String],
  location: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  last_login: Date,
  resetMode: {
    type: String,
    default: resetModes.LOCKED,
  },
  provider: {
    //corresponds to authentication provider, SELF refers to authentication with REELPIC
    type: String,
    default: provider.SELF,
  },
  photo: {
    type: String,
    default: "",
  },
  catalogues: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Catalogue",
    },
  ],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  notifications: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Notification",
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  seen: [],
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (text) {
    return this.encryptPassword(text) === this.hashed_password;
  },
  
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (error) {
      console.error("Error creating hash of password");
      return "";
    }
  },
};

UserSchema.path("hashed_password").validate({
  validator: function (v) {
    if (this._password && this._password.length < 6) {
      this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (!this._password && this.isNew) {
      this.invalidate("password", "Password is required");
    }
  },
});

module.exports = mongoose.model("User", UserSchema);
