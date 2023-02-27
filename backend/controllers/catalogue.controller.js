import Catalogue from "../models/catalogue.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import extend from "lodash/extend.js";


const read = async (req, res, next) => {
  try {
    const catalogue = await Catalogue.findById(req.params.catalogueId);
    if (!catalogue) {
      return res.status(400).json({
        message: "Could not find requested catalogue",
      });
    }
    return res.status(200).json({
      message: "Retrieved catalogue succesfully",
      catalogue,
    });
  } catch (error) {}
};
const list = async (req, res, next) => {
  try {
    let user = req.profile;
    console.log(user);
    let catalogueIds = user.catalogues;
    return res.status(200).json({
      message: "Got catalogue items successfully",
      catalogueIds,
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error),
    });
  }
};
const create = async (req, res, next) => {
  try {
    let user = req.profile;
    if (user._id.toString() !== req.body.userId.toString()) {
      return res.status(400).json({
        message: "Unauthorized user",
      });
    }
    const catalogue = await Catalogue.create(req.body);
    user.catalogues.push(catalogue._id);
    await catalogue.save();
    await user.save();
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
    let catalogue = await Catalogue.findById(req.params.catalogueId);
    if (!catalogue) {
      return res.status(400).json({
        message: "Couldn't find requested catalogue",
      });
    }
    await catalogue.remove();
    return res.status(200).json({
      message: "Removed catalogue",
    });
  } catch (error) {
    return res.status(400).json({
      message: errorHandler.getErrorMessage(error) + error,
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

export default { create, update, addItem, remove, read, list };
