const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateAddBody, validateUpdateBody } = require("../../middlewares");
const {
  contactAddBodySchema,
  contactUpdateBodySchema,
} = require("../../schemas");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getById);

router.post("/", validateAddBody(contactAddBodySchema), ctrl.addContact);

router.put(
  "/:id",
  validateUpdateBody(contactUpdateBodySchema),
  ctrl.updateContact
);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
