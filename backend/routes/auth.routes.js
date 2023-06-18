const express = require("express");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/auth/login").post(authCtrl.login);
router.route("/auth/OLogin").post(authCtrl.OAuthLogin);
// router.route("/auth/user").get(authCtrl.hasAuthorization, authCtrl.authUser);
router.route("/auth/logout").get(authCtrl.logout);
router.route("/auth/password_reset").post(authCtrl.password_reset);
router.route("/auth/reset_confirm/:userId/:token").get(authCtrl.reset_confirm);
router.route("/auth/reset_done").post(authCtrl.reset_done);

module.exports = router;
