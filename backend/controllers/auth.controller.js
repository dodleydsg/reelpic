import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password dont't match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      error: "Could not llogin",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Logged out",
  });
};

const hasAuthorization = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const password_reset = async (req, res) => {};

const reset_confirm = async (req, res) => {};

const reset_done = async (req, res) => {};

const requireLogin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export default {
  login,
  logout,
  hasAuthorization,
  requireLogin,
  password_reset,
  reset_confirm,
  reset_done,
};
