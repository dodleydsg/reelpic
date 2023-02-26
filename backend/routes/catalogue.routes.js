import express from "express";
import authCtrl from "./auth.controller.js";
import postCtrl from "./post.controller.js";
import authController from "./auth.controller.js";

const router = express.Router;

router
  .route("/api/catalogues/")
  .get(
    postCtrl.addUserToCookie,
    authCtrl.login,
    authController.hasAuthorization
  );
