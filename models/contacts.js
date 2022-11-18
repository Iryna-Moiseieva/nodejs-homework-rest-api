const fs = require("fs").promises;
const path = require("path");
const objectid = require("objectid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (item) => item.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
};

async function addContact(body) {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: objectid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2 ));
  return newContact;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [deleteContact] = contacts.splice(idx, 1);;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
};

async function updateContact (contactId, body) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const { name, email, phone } = body;
  const id = contactId;
  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
};
