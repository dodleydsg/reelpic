const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:username")
  .get(userCtrl.read)
  .put(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.remove);

router
  .route("/api/follow/:_id")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    userCtrl.follow
  );

router.param("userId", userCtrl.getUser);

module.exports = router;
