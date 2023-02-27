import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

export const basicSetupAndAutorisation = () => {
  userCtrl.getUser();
  authCtrl.requireLogin();
  authCtrl.hasAuthorization();
};

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireLogin, userCtrl.read)
  .put(basicSetupAndAutorisation, userCtrl.update)
  .delete(basicSetupAndAutorisation, userCtrl.remove);

router.param("userId", userCtrl.getUser);

export default router;
