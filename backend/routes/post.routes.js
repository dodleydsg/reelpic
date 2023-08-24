const express = require("express");
const postCtrl = require("../controllers/post.controller");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/api/posts")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.create
  )
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.list
  );

router
  .route("/api/post/return/:postId")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.returnPost
  );
router
  .route("/api/post/:postId")
  .get(postCtrl.read)
  .delete(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.trash
  )
  .put(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.update
  );

router
  .route("/api/post/delete/:postId")
  .delete(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.remove
  );

router
  .route("/api/post/like/")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.like
  );
router
  .route("/api/feed")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.feed
  );
router
  .route("/api/explore")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    postCtrl.explore
  ); 
module.exports = router;
