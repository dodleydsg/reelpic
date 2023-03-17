const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const commentCtrl = require("../controllers/comment.controller");

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

module.exports = router;
