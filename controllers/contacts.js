const { Contact } = require("../models/contacts.js");

async function getAll(req, res, next) {
  const result = await Contact.find();

  return res.json(result);
}

async function getById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findById(id);

  return res.status(200).json(result);
}

async function create(req, res, next) {
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
}

async function putById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true });

    return res.status(200).json(result);
}

async function updateFavorite (req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

    return res.status(200).json(result);
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);


  return res.status(200).json({ message: "Contact deleted", result });

};

module.exports = {
  getAll,
  getById,
  create,
  putById,
  updateFavorite,
  deleteById
};