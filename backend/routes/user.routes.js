import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireLogin, userCtrl.read)
  .put(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.remove);


router
  .route("/api/follow/:_id")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    userCtrl.follow
  );

router.param("userId", userCtrl.getUser);

export default router;
