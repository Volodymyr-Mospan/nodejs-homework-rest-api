const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateAddBody,
  validateUpdateBody,
  validateUpdateFavorite,
  isValidId,
} = require("../../middlewares");
const {
  contactBodySchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas");

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateAddBody(contactBodySchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateUpdateBody(contactBodySchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateUpdateFavorite(contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
