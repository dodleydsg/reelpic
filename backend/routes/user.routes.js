import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import { expressjwt } from "express-jwt";

const router = express.Router();

export const basicSetupAndAutorisation = async (req, res, next) => {
  try {
    let user = await User.findById(req.cookies._id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};



router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireLogin, userCtrl.read)
  .put(basicSetupAndAutorisation, userCtrl.update)
  .delete(basicSetupAndAutorisation, userCtrl.remove);

router.param("userId", userCtrl.getUser);

export default router;
