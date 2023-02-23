import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { sendMail } from "../helpers/emailReset.js";
import resetModes from "../helpers/resetModes.js";
const { createHmac } = await import("node:crypto");

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
    user.last_login = Date.now();
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        last_login: user.last_login,
      },
    });
  } catch (error) {
    return res.status(401).json({
      error: "Could not login",
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
const password_reset = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    const user_obj = {
      _id: user._id,
      last_login: user.last_login,
      hashed_password: user.hashed_password,
    };
    const hash = createHmac("sha256", user.salt)
      .update(JSON.stringify(user_obj))
      .digest("hex");
    const timestamp = new Date().toISOString();
    const token = timestamp + "|" + hash;
    if (user) {
      const options = {
        from: process.env.EMAIL,
        to: "dodleydesign@gmail.com",
        subject: "Reset password",
        body: `localhost:3000/auth/reset_confirm/${user._id}/${token}`,
      };
      sendMail(options);
      // Changes reset mode to "PENDING"
      user.resetMode = resetModes.PENDING;
      user.save();
    }
  } catch (error) {
    console.log("Error sending reset email", error);
  } finally {
    return res.status(200).json({
      message: `Reset message was sent to ${req.body.email}`,
    });
  }
};

const reset_confirm = async (req, res, next) => {
  // Verifies token in url and return appropriate message

  try {
    let user = await User.findOne({
      _id: req.params.userId,
    });
    if (user) {
      if (user.resetMode !== resetModes.PENDING) {
        return res.status(404).json({ message: "Reset token invalid" });
      }
      const timestamp = req.params.token.split("|")[0];
      const hash = req.params.token.split("|")[1];
      // check if token is expired

      const user_obj = {
        _id: user._id,
        last_login: user.last_login,
        hashed_password: user.hashed_password,
      };

      // check if token is time valid
      if (Date() - Date.parse(timestamp) > 1000 * process.env.TOKEN_TTL) {
        return res.status(404).json({
          message: "Token expired",
        });
      }

      // Check if hash is object valid
      if (
        hash !==
        createHmac("sha256", user.salt)
          .update(JSON.stringify(user_obj))
          .digest("hex")
      ) {
        return res.status(404).json({
          message: "Token expired v2",
        });
      }

      // Changes reset mode to "INCOMING"
      user.resetMode = resetModes.INCOMING;
      user.save();
      return res.status(200).json({
        message: "Proceed to reset password",
        user: {
          _id: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Couldn't reset password" + error,
    });
  }
};

const reset_done = async (req, res) => {
  // Resets the password
  // Changes reset mode to "LOCKED"
};

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
