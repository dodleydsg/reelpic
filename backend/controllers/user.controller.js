import User from "../models/user.model.js";
import extend from "loadash/extend";
import errorHandler from "./error.controller";

const create = (req, res, next) => {};
const list = (req, res, next) => {};
const userByID = (req, res, next) => {};
const read = (req, res, next) => {};
const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export default { create, userByID, read, list, remove, update };
