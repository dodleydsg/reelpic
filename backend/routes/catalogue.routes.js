import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";
import catalogueCtrl from "../controllers/catalogue.controller.js";
import { basicSetupAndAutorisation } from "./user.routes.js";

const router = express.Router();

router
  .route("/api/catalogues")
  .post(basicSetupAndAutorisation, catalogueCtrl.create)
  .get(basicSetupAndAutorisation, catalogueCtrl.list);

router
  .route("/api/catalogue/:catalogueId")
  .get(basicSetupAndAutorisation, catalogueCtrl.read)
  .put(basicSetupAndAutorisation, catalogueCtrl.update)
  .delete(basicSetupAndAutorisation, catalogueCtrl.remove);

export default router;
