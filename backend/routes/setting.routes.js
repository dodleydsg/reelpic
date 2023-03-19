const express = require("express"),
  settingCtrl = require("../controllers/settings.controller"),
  userCtrl = require("../controllers/user.controller"),
  authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/api/settings")
  .post(
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    authCtrl.requireLogin,
    settingCtrl.create
  );

router
  .route("/api/setting")
  .put(
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    authCtrl.requireLogin,
    settingCtrl.update
  );



  module.exports = router;
