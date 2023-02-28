import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import postCtrl from "../controllers/post.controller.js";
import userCtrl from "../controllers/user.controller.js";
import commentCtrl from "../controllers/comment.controller.js";

const router = express.Router();

router
  .route("/api/comments")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.list
  )
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.create
  );

router
  .route("/api/comment/:commentId")
  .delete(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.remove
  )
  .put(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.update
  );

router
  .route("/api/comment/reply")
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    commentCtrl.reply
  );

export default router;
