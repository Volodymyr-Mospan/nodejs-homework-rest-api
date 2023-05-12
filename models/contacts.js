const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const listContacts = await fs.readFile(contactsPath);
  return JSON.parse(listContacts);
};

const getById = async (id) => {
  const allContact = await listContacts();
  const contact = allContact.find((contact) => contact.id === id);
  return contact || null;
};

const addContact = async (body) => {
  const allContact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContact, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const allContact = await listContacts();
  const contactIndex = allContact.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [contact] = allContact.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContact, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const allContact = await listContacts();
  const contactIndex = allContact.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  allContact[contactIndex] = { ...allContact[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContact, null, 2));
  return allContact[contactIndex];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
