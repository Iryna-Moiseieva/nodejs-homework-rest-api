const { Contact } = require("../models/contacts.js");

async function getAll(req, res, next) {
  const result = await Contact.find();

  res.json(result);
}

async function getById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findById(id);

  result
    ? res.status(200).json( result )
    : res.status(404).json({ message: "Not found" });
}

async function create(req, res, next) {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
}

async function putById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true });

  result
    ? res.status(200).json( result )
    : res.status(404).json({ message: "Not found" });
}

async function updateFavorite (req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  result
    ? res.status(200).json( result )
    : res.status(404).json({ message: "Not found" });
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  result
    ? res.status(200).json({ message: "Contact deleted", result })
    : res.status(404).json({ message: "Not found" });

};

module.exports = {
  getAll,
  getById,
  create,
  putById,
  updateFavorite,
  deleteById
};