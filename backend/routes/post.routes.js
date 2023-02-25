import express from "express";
import postCtrl from "../controllers/post.controller.js";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/posts")
  .get(authCtrl.requireLogin, authCtrl.hasAuthorization, postCtrl.list)
  .post(authCtrl.requireLogin, authCtrl.hasAuthorization, postCtrl.create);

router
  .route("/api/post/:postId")
  .get(authCtrl.requireLogin, authCtrl.hasAuthorization, postCtrl.returnPost)
  .delete(postCtrl.trash);

router.route("/api/post/delete/:postId").delete(postCtrl.remove);

export default router;
