const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/user/:username")
  .get(userCtrl.read)
  .put(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    userCtrl.remove
  );

router
  .route("/api/user/")
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    userCtrl.altRead
  );

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
