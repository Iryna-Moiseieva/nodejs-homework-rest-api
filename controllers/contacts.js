const { Contact } = require("../models/contacts.js");

async function getAll(req, res, next) {
  const contacts = await Contact.find();

  return res.json(contacts);
}

async function getById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  return contact
    ? res.status(200).json( contact )
    : res.status(404).json({ message: "Not found" });
}

async function create(req, res, next) {
  const contact = await Contact.create(req.body);

  return res.status(201).json(contact);
}

async function putById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true });

  return contact
    ? res.status(200).json( contact )
    : res.status(404).json({ message: "Not found" });
}

async function updateFavorite (req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  return contact
    ? res.status(200).json( contact )
    : res.status(404).json({ message: "Not found" });
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);

  return contact
    ? res.status(200).json({ message: "Contact deleted", contact })
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