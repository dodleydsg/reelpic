import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import postCtrl from "../controllers/post.controller.js";
import commentCtrl from "../controllers/comment.controller.js";

const router = express.Router();

router
  .route("/api/comments")
  .get(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.list
  )
  .post(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.create
  );

router
  .route("/api/comment/:commentId")
  .delete(
    postCtrl.addUserToCookie,
    authCtrl.login,
    authCtrl.hasAuthorization,
    commentCtrl.remove
  );

router
  .route("/api/comment/reply")
  .post(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.reply
  );

export default router;
