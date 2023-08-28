const express = require("express");
const notificationCtrl = require("../controllers/notification.contoller");
const postCtrl = require("../controllers/post.controller");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/api/alerts")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    notificationCtrl.list
  );

router
  .route("/api/post/:alertId")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    notificationCtrl.read
  );

module.exports = router;
