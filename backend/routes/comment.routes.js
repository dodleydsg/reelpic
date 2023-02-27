import express from "express";
import commentCtrl from "../controllers/comment.controller.js";
import { basicSetupAndAutorisation } from "./user.routes.js";

const router = express.Router();

router
  .route("/api/comments")
  .get(basicSetupAndAutorisation, commentCtrl.list)
  .post(basicSetupAndAutorisation, commentCtrl.create);

router
  .route("/api/comment/:commentId")
  .delete(basicSetupAndAutorisation, commentCtrl.remove);

router
  .route("/api/comment/reply")
  .post(basicSetupAndAutorisation, commentCtrl.reply);

export default router;
