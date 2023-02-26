import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";
import catalogueCtrl from "../controllers/catalogue.controller.js";

const router = express.Router();

router
  .route("/api/catalogues")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.create
  );

export default router;
