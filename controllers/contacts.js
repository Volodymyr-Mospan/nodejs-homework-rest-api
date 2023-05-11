const contactsServisce = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contactsServisce.listContacts();
  res.json(result);
};

const getContactByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServisce.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsServisce.addContact(req.body);
  res.status(201).json(result);
};

const updateContactByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServisce.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(result);
};

const deleteContactByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServisce.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactByID: ctrlWrapper(getContactByID),
  addContact: ctrlWrapper(addContact),
  updateContactByID: ctrlWrapper(updateContactByID),
  deleteContactByID: ctrlWrapper(deleteContactByID),
};
