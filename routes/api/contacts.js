const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { contactBodySchema } = require("../../schemas");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactByID);

router.post("/", validateBody(contactBodySchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(contactBodySchema),
  ctrl.updateContactByID
);

router.delete("/:contactId", ctrl.deleteContactByID);

module.exports = router;
