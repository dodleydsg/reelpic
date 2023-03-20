const express = require("express");
const postCtrl = require("../controllers/post.controller");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/api/posts")
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.create
  )
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.list
  );


router
  .route("/api/post/return/:postId")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.returnPost
  );
router
  .route("/api/post/:postId")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.read
  )
  .delete(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.trash
  )
  .put(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.update
  );

router
  .route("/api/post/delete/:postId")
  .delete(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.remove
  );

router
  .route("/api/post/like/")
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    postCtrl.like
  );

module.exports = router;
