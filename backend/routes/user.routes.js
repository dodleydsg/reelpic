const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/user/:username")
  .get(userCtrl.read)
  .put(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    userCtrl.remove
  );

router
  .route("/api/user")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    userCtrl.altRead
  );


router.route("/api/user/hyRead").post(userCtrl.hybridRead)

router
  .route("/api/follow/:followId")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    userCtrl.follow
  );


router.param("userId", userCtrl.getUser);

module.exports = router;
