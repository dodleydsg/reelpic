import express from "express";
import postCtrl from "../controllers/post.controller.js";
import { basicSetupAndAutorisation } from "./user.routes.js";

const router = express.Router();

router
  .route("/api/posts")
  .post(basicSetupAndAutorisation, postCtrl.create)
  .get(basicSetupAndAutorisation, postCtrl.list);

router
  .route("/api/post/:postId")
  .get(basicSetupAndAutorisation, postCtrl.returnPost)
  .delete(basicSetupAndAutorisation, postCtrl.trash);

router
  .route("/api/post/delete/:postId")
  .delete(basicSetupAndAutorisation, postCtrl.remove);

export default router;
