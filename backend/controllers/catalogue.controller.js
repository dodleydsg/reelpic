const Catalogue = require("../models/catalogue.model");
const extend = require("lodash");
const { genericErrorBlock, unAuthorizedErrorBlock } = require("./errors");
const notify = require("../helpers/notify");

const read = async (req, res, next) => {
  try {
    const catalogue = await Catalogue.findById(req.params.catalogueId);
    if (!catalogue) {
      return res.status(400).json({
        message: "Could not find requested catalogue",
      });
    }
    return res.status(200).json(catalogue);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const list = async (req, res, next) => {
  try {
    let catalogues = [];
    let catalogueIds = req.profile.catalogues;
    for (let i = catalogueIds.length - 1; i >= 0; i--) {
      let catalogue = await Catalogue.findById(catalogueIds[i]);
      // .populate("user", "username photo")
      if (catalogue) {
        catalogues.push(catalogue);
      }
    }
    return res.status(200).json(catalogues);
  } catch (error) {
    genericErrorBlock(error, res);
  }
};
const create = async (req, res, next) => {
  try {
    let user = req.profile;
    const catalogue = await Catalogue.create({...req.body, userId: user._id});
    user.catalogues.push(catalogue._id);
    await catalogue.save();
    await user.save();
    let description = `You created a catalogue with title <b>${catalogue.title}</b>`;
    await notify(req.profile._id, description);
    return res.status(200).json(catalogue);
  } catch (error) {
    console.log(error)
    genericErrorBlock(error, res);
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
    let description = `You deleted a catalogue with title <b>${catalogue.title}</b>`;
    await notify(req.profile._id, description);
    return res.status(200).json({
      message: "Removed catalogue",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const update = async (req, res, next) => {
  try {
    let catalogue = await Catalogue.findOne({
      _id: req.params.catalogueId,
    });
    catalogue = extend(catalogue, req.body);
    await catalogue.save();
    let description = `You updated a catalogue with title <b>${catalogue.title}</b>`;
    await notify(req.profile._id, description);
    return res.status(200).json({
      message: "Catalogue updated",
      catalogue,
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

const addItem = async (req, res, next) => {
  try {
    let catalogue = await Catalogue.findOne({
      _id: req.params.catalogueId,
    });
    catalogue.items = catalogue.items + req.body.items;
    await catalogue.save();
    let description = `You updated a catalogue with title <b>${catalogue.title}</b>`;
    await notify(req.profile._id, description);
    return res.status(200).json({
      message: "Successfully added item",
    });
  } catch (error) {
    genericErrorBlock(error, res);
  }
};

module.exports = { create, update, addItem, remove, read, list };
