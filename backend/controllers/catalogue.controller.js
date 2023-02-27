import Catalogue from "../models/catalogue.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import extend from "lodash/extend.js";


const list = async (req, res, next) => {};
const create = async (req, res, next) => {
  try {
    const catalogue = await Catalogue.create(req.body);
    await catalogue.save();
    return res.status(200).json({
      message: "Added catalogue successfully",
      catalogue,
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let catalogue = await Catalogue.findOne({
      _id: req.params.catalogueId,
    });
    await catalogue.remove();
    return res.status(200).json({
      message: "Removed catalogue",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const update = async (req, res, next) => {
  try {
    let catalogue = await Catalogue.findOne({
      _id: req.params.catalogueId,
    });
    catalogue = extend(catalogue, req.body);
    await catalogue.save();
    return res.status(200).json({
      message: "Catalogue updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

const addItem = async (req, res, next) => {
  try {
    let catalogue = await Catalogue.findOne({
      _id: req.params.catalogueId,
    });
    catalogue.items = catalogue.items + req.body.items;
    await catalogue.save();
    return res.status(200).json({
      message: "Successfully added item",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};

export default { create, update, addItem, remove, list };
