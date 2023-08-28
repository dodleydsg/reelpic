const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller.js");
const catalogueCtrl = require("../controllers/catalogue.controller");

const router = express.Router();

router
  .route("/api/catalogues")
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.list
  )
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.create
  );

router
  .route("/api/catalogue/:catalogueId")
  .post(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.addItem
  )
  .put(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.update
  )
  .delete(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.remove
  )
  .get(
    authCtrl.requireLogin,
    userCtrl.getUser,
    authCtrl.hasAuthorization,
    catalogueCtrl.read
  );

module.exports = router;
