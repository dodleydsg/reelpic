const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const commentCtrl = require("../controllers/comment.controller");

const router = express.Router();

router
  .route("/api/comments")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.list
  )
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.create
  );

router
  .route("/api/comments/ids/:postId")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.listIds
  );

router
  .route("/api/comments/detail")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.detail
  );

router
  .route("/api/comment/:commentId")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.read
  )
  .delete(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.remove
  )
  .put(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.update
  );

router
  .route("/api/comment/reply")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    commentCtrl.reply
  );

module.exports = router;
