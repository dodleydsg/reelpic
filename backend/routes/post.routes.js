import express from "express";
import postCtrl from "../controllers/post.controller.js";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/posts")
  .post(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.create
  );

router
  .route("/api/:userId/posts")
  .get(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.list
  );

router
  .route("/api/post/:postId")
  .get(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.returnPost
  )
  .delete(
    postCtrl.addUserToCookie,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.trash
  );

router.route("/api/post/delete/:postId").delete(postCtrl.remove);

export default router;
