import mongoose from "mongoose";
const { createHmac } = await import("node:crypto");
import resetModes from "../helpers/resetModes.js";
import { type } from "node:os";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
    required: "Email is required",
  },
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
  photo: String,
  birthday: {
    type: Date,
    default: null,
  },
  posts_liked: [String],
  catalogues: [String],
  posts: [String],
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
      console.error("Error created hash of password");
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

export default mongoose.model("User", UserSchema);
