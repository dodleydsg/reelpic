const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller.js");
const catalogueCtrl = require("../controllers/catalogue.controller");

const router = express.Router();

router
  .route("/api/catalogues")
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.list
  )
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.create
  );

router
  .route("/api/catalogue/:catalogueId")
  .post(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.addItem
  )
  .put(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.update
  )
  .delete(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.remove
  )
  .get(
    userCtrl.getUser,
    authCtrl.requireLogin,
    authCtrl.hasAuthorization,
    catalogueCtrl.read
  );

module.exports = router;
